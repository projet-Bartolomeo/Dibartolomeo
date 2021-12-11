import { lesson } from '../model/Lesson'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    lesson,
    getLessonsTeacherId : [],
    getLessonsByStudentId : [] 
})

export const mutations = {
    setLessonsTeacherId(state, getLessonsTeacherId){
        state.getLessonsTeacherId = getLessonsTeacherId
    },
    setLessonsByStudentId(state, getLessonsByStudentId){
        state.getLessonsByStudentId = getLessonsByStudentId
    },
}

export const actions = {
    async createLesson({ commit }, newLesson) {
        const lesson = await this.$fire.firestore.collection('lesson').add(newLesson)
        return lesson
    },
    async getLessonById({ commit }, id) {
        const lesson = await this.$fire.firestore.collection('lesson').doc(id).get()
        return lesson.data()
    },
    async getLessonsTeacherId({ commit } ,idTeacher){
        const results = await this.$fire.firestore.collection('lesson').where('profesor' ,'==', `${idTeacher}`).get()
        return readQuerySnapshot(results)
    },
    async  getLessonsByStudentId({ commit } ,idStudent){
        const results = await this.$fire.firestore.collection('lesson').where('studentliste' ,'array-contains', `${idStudent}`).get()
        return readQuerySnapshot(results)
    },
    async updateLesson({ commit }, { id, payload }) {
        const lesson = await this.$fire.firestore.collection('lesson').doc(id).update(payload)
        return lesson
    }
}
