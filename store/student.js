import { user } from '../model/User'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    user,
    getAll: [],
    getByTeacherId: [],
    getByLessonId: [],
})

export const mutations = {
    setAllStudents(state, getAllStudents) {
        state.getAllStudents = getAllStudents
    },

    setStudentByTeacherId(state, getStudentByTeacherId) {
        state.getStudentByTeacherId = getStudentByTeacherId
    },

    setStudentByLessonId(state, getStudentByLessonId) {
        state.getStudentByLessonId = getStudentByLessonId
    }
}

export const actions = {
    async getAll({ commit }) {
        try {
            const results = await this.$fire.firestore.collection('user').where('type', '==', 'student').get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async getByTeacherId({ commit }, idTeacher) {
        try {
            const results = await this.$fire.firestore.collection('user').where('teacherList', 'array-contains', `${idTeacher}`).get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération de vos élèves', type: 'error' }, { root: true })
        }
    },

    async getByLessonId({ commit }, idLesson) {
        try {
            const results = await this.$fire.firestore.collection('user').where('lessonList', 'array-contains', `${idLesson}`).get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

    async getById({ commit }, id) {
        try {
            const result = await this.$fire.firestore.collection('user').doc(id).get()
            return { ...result.data(), id: result.id }
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération de l\'élève', type: 'error' }, { root: true })
        }
    },
}
