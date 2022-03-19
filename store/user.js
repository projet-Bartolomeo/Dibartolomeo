import { readQuerySnapshot } from '../services/firestoreHelper'
export const state = () => ({
    id: '0kK1fyyWN8N2bkHNYLoo',
    participants:[],
})
export const mutations = {
    set(state, { list, stateName }) {
        state[stateName] = list
    },

}
export const actions = {
    async modify({ commit }, { id, payload }) {
        try {
            const user = await this.$fire.firestore.collection('user').doc(id).update(payload)
            commit('notification/create', { description: 'l\'utilisateur a bien été mis à jour' }, { root: true })
            return user
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la mise à jour de l\'utilisateur', type: 'error' }, { root: true })
        }
    },
     async recupuser({ commit, dispatch }){
        const participantSnapshot= await this.$fire.firestore.collection('user').where('email','==','johanna.dezarnaud@ynov.com').get()
       const participants = readQuerySnapshot(participantSnapshot)
        commit('set', { stateName: 'participants', list:  participants  })
    }
}
