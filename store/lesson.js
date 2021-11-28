import { lesson } from '../model/Lesson'

export const state = () => ({
    lesson
})

export const actions = {
    async createLesson({ commit }, newLesson) {
        const lesson = await this.$fire.firestore.collection('lesson').add(newLesson)
        return lesson
    }
}
