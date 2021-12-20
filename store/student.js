import { user } from '../model/User'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    user,
    getAllStudents: [],
    getStudentByTeacherId: [],
    getStudentByLessonId: [],

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
    async getAllStudents() {
        const results = await this.$fire.firestore.collection('user').where('type', '==', 'student').get()
        return readQuerySnapshot(results)
    },

    async getStudentByTeacherId({ commit }, idTeacher) {
        const results = await this.$fire.firestore.collection('user').where('teacherList', 'array-contains', `${idTeacher}`).get()
        return readQuerySnapshot(results)
    },

    async getStudentByLessonId({ commit }, idLesson) {
        const results = await this.$fire.firestore.collection('user').where('lessonList', 'array-contains', `${idLesson}`).get()
        return readQuerySnapshot(results)
    },

    async getStudentById({ commit }, id) {
        const results = await this.$fire.firestore.collection('user').doc(id).get()
        return results.data()
    },
}

