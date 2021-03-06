import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    teacherList: [],
    fromLesson: [],
    notInLesson: [],
    details: {},
    new: {},
    form: {},
    participant: {},
})

export const mutations = {
    set(state, { student, stateName }) {
        state[stateName] = student
    },

    removeFromList(state, { stateName, studentId }) {
        state[stateName].forEach((student, studentKey) => {
            if (student.id === studentId) state[stateName].splice(studentKey, 1)
        })
    },

    modify(state, { payload, stateName }) {
        state[stateName] = { ...state[stateName], ...payload }
    },

    addToList(state, { stateName, student }) {
        state[stateName].push(student)
    },

    modifyList(state, { stateName, studentId, payload }) {
        state[stateName].forEach((notUpdatedStudent, studentKey) => {
            if (studentId === notUpdatedStudent.id) state[stateName][studentKey] = { ...notUpdatedStudent, payload }
        })
    },
}

export const actions = {
    async setDetails({ commit }, studentId) {
        try {
            const user = await this.$fire.firestore.collection('user')
                .doc(studentId)
                .get()
            commit('set', { stateName: 'details', student: { ...user.data(), id: user.id } })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des informations', type: 'error' }, { root: true })
        }
    },

    setNew({ commit, dispatch }) {
        dispatch('resetNewForm')
        commit('set', {
            stateName: 'form',
            student: { valid: false, validParticipant: false },
        })
    },
    async setTeacherList({ commit, rootState }) {
        try {
            const studentsSnapshot = await this.$fire.firestore.collection('user')
                .where('teacherIds', 'array-contains', rootState.user.connected.id)
                .get()
            const students = readQuerySnapshot(studentsSnapshot)
            commit('set', { stateName: 'teacherList', student: students })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setParticipant({ commit, rootState }, idUserPrincipal) {
        try {
            const participantSnapshot = await this.$fire.firestore.collection('user')

                .where("isPrincipal", "==", false).where("idUserPrincipal", "==", idUserPrincipal).where("isDeleted", "==", false).get()

            const participant = readQuerySnapshot(participantSnapshot)

            commit('set', { stateName: 'participant', student: participant })
            return participant
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setFromLesson({ rootState, commit, dispatch }, { stateName }) {
        try {
            const studentIds = rootState.lesson[stateName].studentIds
            const students = await Promise.all([...studentIds.map(async id => {
                const user = await this.$fire.firestore.collection('user').doc(id).get()
                return { ...user.data(), id: user.id }
            })])
            commit('set', { stateName: 'fromLesson', student: students })
            dispatch('setNotInLesson', { stateName })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setNotInLesson({ rootState, commit }, { stateName }) {
        try {
            const studentInLessonIds = rootState.lesson[stateName].studentIds
            let students = await this.$fire.firestore.collection('user')
                .where('teacherIds', 'array-contains', rootState.user.connected.id)
                .get()
            students = readQuerySnapshot(students).filter(student => !studentInLessonIds.includes(student.id))
            commit('set', { stateName: 'notInLesson', student: students })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async removeFromTeacher({ commit, rootState }, { student }) {
        try {
            commit('removeFromList', { stateName: 'teacherList', studentId: student.id })

            const lastTeacherList = student.teacherIds

            const teacherIds = lastTeacherList.filter(lastTeacherList => lastTeacherList !== rootState.user.connected.id)

            let isDeleted = true
            if (student.isRegistered) isDeleted = false

            const lessonsToUdpateSnapshot = await this.$fire.firestore.collection('lesson')
                .where('studentIds', 'array-contains', student.id).get()

            const lessonsToUpdate = readQuerySnapshot(lessonsToUdpateSnapshot)

            await Promise.all([
                ...lessonsToUpdate.map(async lesson => {
                    const studentIds = lesson.studentIds.filter(id => student.id !== id)
                    await this.$fire.firestore.collection('lesson').doc(lesson.id).update({ studentIds })
                }),
                this.$fire.firestore.collection('user')
                    .doc(student.id)
                    .update({ teacherIds, isDeleted })
            ])

            commit('notification/create', { description: 'L\'élève a été supprimé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la suppression ', type: 'error' }, { root: true })
        }
    },

    async createFromTeacher({ rootState, commit }, { student, password }) {
        try {
            const { user } = await this.$fire.auth.createUserWithEmailAndPassword(student.email, password)
            const id = user.uid
            const newStudent = { ...student, teacherIds: [rootState.user.connected.id], isRegistered: false, isDeleted: false, type: 'student' }
            commit('addToList', { stateName: 'teacherList', student: newStudent })
            await this.$fire.firestore.collection('user').doc(id).set(newStudent)

            commit('notification/create', { description: 'Élève créé' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la création de l\'élève', type: 'error' }, { root: true })
        }
    },

    async addProfessor({ rootState }, { teacherId }) {
        const connectedUser = rootState.user.connected
        const { teacherIds, id } = connectedUser

        const hasAlreadyThisProfessor = teacherIds.includes(teacherId)
        const isNotStudent = connectedUser.type !== 'professor'
        if (hasAlreadyThisProfessor || isNotStudent) return

        const newTeacherIds = [...teacherIds, teacherId]
        await this.$fire.firestore.collection('user').doc(id).update({ teacherIds: newTeacherIds })
    },

    async modify({ commit, rootState }, { studentId, payload }) {
        try {
            commit('modifyList', { stateName: 'teacherList', studentId, payload })

            await this.$fire.firestore.collection('user').doc(studentId).update(payload)
            if (rootState.user.connected.type === "student") {
                const auth = await this.$fire.auth.currentUser
                auth.updateEmail(payload.email)
            }

            commit('notification/create', { description: 'Le compte a été mis à jour' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la modifiction ', type: 'error' }, { root: true })
        }
    },

    resetNewForm({ commit }) {
        commit('set', {
            stateName: 'new',
            student: {
            },
        })
    },

    resetEditionForm({ commit, rootState }, { storeName, stateName }) {
        commit(`${storeName}/modify`, { stateName, payload: rootState[storeName].form.oldValues })
        commit(`${storeName}/set`, {
            stateName: 'form',
        })
    },
}
