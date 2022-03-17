export const state = () => ({
    id: '0kK1fyyWN8N2bkHNYLoo',
    userlogin:'',
})
export const mutations = {
    set(state, { value, stateName }) {
        state[stateName] = value
    },
}

export const actions = {
    async modify({ commit }, { id, payload }) {
        try {
            const user = await this.$fire.firestore.collection('user').doc(id).update(payload)
            commit('notification/create', { description: 'l\'utilisateur a bien été mis à jour' }, { root: true })
            return user
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la mise à jour de l\'utilisateur', type: 'error' })
        }
    },
    async addUser({ commit }, NewUser) {
        try {
            await this.$fire.firestore.collection('user').doc(NewUser.uid).set(NewUser)
            commit('notification/create', { description: 'l\'utilisateur a bien été créer' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'problème lors de la créationd de l\'utilisateur', type: 'error' })
        }

    },
    async getuserbyid({ commit }, id) {
     
         const user=   await this.$fire.firestore.collection('user').doc(id)
         commit('set', { stateName: 'userlogin', value:  user  })
           
        

    },
}
