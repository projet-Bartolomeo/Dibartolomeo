import { lesson } from '../model/Lesson'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    lesson
})

export const actions = {
    async createLesson({ commit }, newLesson) {
        const lesson = await this.$fire.firestore.collection('lesson').add(newLesson)
        return lesson
    },
    async getLessonById({ commit }, id) {
        const lesson = await this.$fire.firestore.collection('lesson').doc(id).get()
        return lesson.data().lesson
    },
    async getLessonsTeacherId({ commit } ,idTeacher){
        const results = await this.$fire.firestore.collection('lesson').where('profesor' ,'==', `${idTeacher}`).get()
        return readQuerySnapshot(results)
    },
    async updateLesson({ commit }, { id, payload }) {
        const lesson = await this.$fire.firestore.collection('lesson').doc(id).update(payload)
        return lesson
    }
}
