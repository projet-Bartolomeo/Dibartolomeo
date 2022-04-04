export const state = () => ({
    id: 'm4LAKiljhevFTHr1wk69',
    type:'student',
    userlogin:{},
})
export const mutations = {
    set(state, { lesson, stateName }) {
        state[stateName] = lesson
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
    async addUser({ commit }, {NewUser,id}) {
        try {
            await this.$fire.firestore.collection('user').doc(id).set(NewUser)
            commit('notification/create', { description: 'l\'utilisateur a bien été créer' }, { root: true })

        } catch (error) {
            commit('notification/create', { description: 'problème lors de la créationd de l\'utilisateur', type: 'error' })
            console.log(NewUser.uid)
            console.log(error)
        }

    },
    async getuserbyid({ commit }, id) {
     
         const user=   await this.$fire.firestore.collection('user').doc(id)
         commit('set', { stateName: 'userlogin', value:  user  })
           
        

    },
    
    
}
