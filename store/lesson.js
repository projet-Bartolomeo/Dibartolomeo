import { lesson } from '../model/Lesson'
import { readQuerySnapshot } from '../services/firestoreHelper'

export const state = () => ({
    lesson,
    getByTeacherId: [],
    getByStudentId: [],
    Dates:[],
})

export const mutations = {
    setTeacherId(state, getByTeacherId) {
        state.getByTeacherId = getByTeacherId
    },
    setByStudentId(state, getByStudentId) {
        state.getByStudentId = getByStudentId
    },
    setDates(state, Dates) {
        state.Dates= Dates
    },
}

export const actions = {
    async create({ commit }, newLesson) {
        try {
            const lesson = await this.$fire.firestore.collection('lesson').add(newLesson)
            commit('notification/create', { description: 'votre cours a bien été créé' }, { root: true })
            return lesson
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la création de votre cours', type: 'error' }, { root: true })
        }
    },
    async getById({ commit }, id) {
        try {
            const lesson = await this.$fire.firestore.collection('lesson').doc(id).get()
            return lesson.data()
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de votre cours', type: 'error' }, { root: true })
        }
    },
    async getByTeacherId({ commit }, {idTeacher,startdate,endDate}){
        const results
        const DateDay=new Date();
        if(startdate==''|| endDate==''){
            results = await this.$fire.firestore.collection('lesson').where('startdate','>=',DateDay).get()
        }else{
         results = await this.$fire.firestore.collection('lesson').where('profesor', '==', `${idTeacher}`)
        .where('startDate','==',`${startdate}`).where('EndDate','==',`${endDate}`).where('startdate','>=',DateDay).get()
        }
        return readQuerySnapshot(results)
    },
    async getByStudentId({ commit }, idStudent) {
        try {
            const results = await this.$fire.firestore.collection('lesson').where('studentliste', 'array-contains', `${idStudent}`).get()
            return readQuerySnapshot(results)
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la récupération de vos cours', type: 'error' }, { root: true })
        }
    },
    async update({ commit }, { id, payload }) {
        try {
            const lesson = await this.$fire.firestore.collection('lesson').doc(id).update(payload)
            commit('notification/create', { description: 'le cours a bien été mis à jour' }, { root: true })
            return lesson
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la mise à jour de votre cours', type: 'error' }, { root: true })
        }
    }
}
