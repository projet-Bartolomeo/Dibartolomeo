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
        try {
            const results = await this.$fire.firestore.collection('user').where('type', '==', 'student').get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

        try {
            const results = await this.$fire.firestore.collection('user').where('teacherList', 'array-contains', `${idTeacher}`).get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération de vos élèves', type: 'error' }, { root: true })
        }
    },

        try {
            const results = await this.$fire.firestore.collection('user').where('lessonList', 'array-contains', `${idLesson}`).get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération des élèves', type: 'error' }, { root: true })
        }
    },

        try {
            const result = await this.$fire.firestore.collection('user').doc(id).get()
            return { ...result.data(), id: result.id }
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la récupération de l\'élève', type: 'error' }, { root: true })
        }
    },
}

