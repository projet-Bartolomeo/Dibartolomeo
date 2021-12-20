import { lesson } from '../model/Lesson'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    lesson,
    getByTeacherId: [],
    getByStudentId: []
})

export const mutations = {
    setLessonsTeacherId(state, getByTeacherId) {
        state.getByTeacherId = getByTeacherId
    },
    setLessonsByStudentId(state, getByStudentId) {
        state.getByStudentId = getByStudentId
    },
}

export const actions = {
    async create({ commit }, newLesson) {
        const lesson = await this.$fire.firestore.collection('lesson').add(newLesson)
        commit('notification/open', { description: 'votre cours a bien été créé' }, { root: true })
        return lesson
    },
    async getById({ commit }, id) {
        const lesson = await this.$fire.firestore.collection('lesson').doc(id).get()
        return lesson.data()
    },
    async getByTeacherId({ commit }, idTeacher) {
        const results = await this.$fire.firestore.collection('lesson').where('profesor', '==', `${idTeacher}`).get()
        return readQuerySnapshot(results)
    },
    async getByStudentId({ commit }, idStudent) {
        const results = await this.$fire.firestore.collection('lesson').where('studentliste', 'array-contains', `${idStudent}`).get()
        return readQuerySnapshot(results)
    },
    async update({ commit }, { id, payload }) {
        const lesson = await this.$fire.firestore.collection('lesson').doc(id).update(payload)
        commit('notification/open', { description: 'le cours a bien été mis à jour' }, { root: true })
        return lesson
    }
}
