import { user } from '../model/User'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    user
})

export const actions = {
    async getAllStudents() {
        const results = await this.$fire.firestore.collection('user').where('type', '==', 'student').get()
        return readQuerySnapshot(results)
    },

    async GetStudentByTeacherId({ commit } ,idTeacher){
        const results = await this.$fire.firestore.collection('user').where('teacherList' ,'array-contains', `${idTeacher}`).get()
        return readQuerySnapshot(results)
    },

    async getStudentById({ commit },id ) {
        const results = await this.$fire.firestore.collection('user').doc(id).get()
        return results.data()
    },
}

