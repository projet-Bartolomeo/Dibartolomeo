import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    teacherList: [],
    fromLesson: [],
    notInLesson: [],
    details: {},
    new: {},
    form: {},
    paticipant: {}

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
            commit('notification/create', { description: 'Problème lors de la récupération de votre élève', type: 'error' }, { root: true })
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
                .where('teacherIds', 'array-contains', rootState.user.id).get()
            const students = readQuerySnapshot(studentsSnapshot)
            commit('set', { stateName: 'teacherList', student: students })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setParticipant({ commit, rootState }, idUserPrincipal) {
        try {
            const participantSnapshot = await this.$fire.firestore.collection('user')

            .where("isPrincipal", "==", false).where("idUserPrincipal", "==", idUserPrincipal).get()

            const participant = readQuerySnapshot(participantSnapshot)
            console.log(participant);
            commit('set', { stateName: 'paticipant', student: participant })
        } catch (error) {
            console.log(error);

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
            commit('notification/create', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setNotInLesson({ rootState, commit }, { stateName }) {
        try {
            const studentInLessonIds = rootState.lesson[stateName].studentIds
            let students = await this.$fire.firestore.collection('user')
                .where('teacherIds', 'array-contains', rootState.user.id)
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


            const teacherIds = lastTeacherList.filter(lastTeacherList => lastTeacherList !== rootState.user.id)

            let isDeleted = true
            if (student.isRegistered) isDeleted = false

            await this.$fire.firestore.collection('user')
                .doc(student.id)
                .update({ teacherIds, isDeleted })

            commit('notification/create', { description: 'L\'élève a été supprimé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la suppression ', type: 'error' }, { root: true })
        }
    },

    async createFromTeacher({ rootState, commit }, student) {
        try {
            const newStudent = { ...student, teacherIds: [rootState.user.id], isRegistered: false, isDeleted: false }
            commit('addToList', { stateName: 'teacherList', student: newStudent })

            await this.$fire.firestore.collection('user').add(newStudent)
            commit('notification/create', { description: 'élève créé' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'problème lors de la création de l\'élève', type: 'error' }, { root: true })
        }
    },

    async modify({ commit }, { studentId, payload }) {
        try {
            commit('modifyList', { stateName: 'teacherList', studentId, payload })

            await this.$fire.firestore.collection('user').doc(studentId).update(payload)

            commit('notification/create', { description: 'élève mis à jour' }, { root: true })

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
