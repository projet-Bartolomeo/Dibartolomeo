import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    teacherList: [],
    fromLesson: [],
    notInLesson: [],
    details: {},
    new: {},
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

    async setTeacherList({ commit, rootState }) {
        try {
            const studentsSnapshot = await this.$fire.firestore.collection('user')
                .where('teacherList', 'array-contains', rootState.user.id).get()
            const students = readQuerySnapshot(studentsSnapshot)
            commit('set', { stateName: 'teacherList', student: students })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setFromLesson({ rootState, commit, dispatch }) {
        try {
            const studentIds = rootState.lesson.details.studentIdsList
            const students = await Promise.all([...studentIds.map(async id => {
                const user = await this.$fire.firestore.collection('user').doc(id).get()
                return { ...user.data(), id: user.id }
            })])
            commit('set', { stateName: 'fromLesson', student: students })
            dispatch('setNotInLesson')
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async setNotInLesson({ rootState, commit }) {
        try {
            const studentInLessonIds = rootState.lesson.details.studentIdsList
            let students = await this.$fire.firestore.collection('user')
                .where('teacherList', 'array-contains', rootState.user.id)
                .get()
            students = readQuerySnapshot(students).filter(student => !studentInLessonIds.includes(student.id))
            commit('set', { stateName: 'notInLesson', student: students })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async removeFromTeacher({ commit, rootState }, student) {
        try {
            commit('removeFromList', { stateName: 'teacherList', studentId: student.id })

            const lastTeacherList = student.teacherList;

            const teacherList = lastTeacherList.filter(lastTeacherList => lastTeacherList !== rootState.user.id);

            let isDeleted = true
            if (student.isRegistered) isDeleted = false

            await this.$fire.firestore.collection('user')
                .doc(student.id)
                .update({ teacherList, isDeleted })

            commit('notification/create', { description: 'L\'élève a été supprimé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la suppression ', type: 'error' }, { root: true })
        }
    },

    async createFromTeacher({ rootState, commit }, student) {
        try {
            const newStudent = { ...student, teacherList: [rootState.user.id], isRegistered: false, isDeleted: false }
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
            commit('notification/create', { description: 'problème lors de la suppression ', type: 'error' }, { root: true })
        }
    }
}
