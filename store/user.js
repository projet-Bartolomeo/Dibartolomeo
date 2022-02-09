export const state = () => ({
    id: '0kK1fyyWN8N2bkHNYLoo'
})

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
     async recupuser(id){
        const user2= await this.$fire.firestore.collection('user').where('idUserPrincipal','==','mKopAfv3e7lYAPj4F63').get()
        return user2
    }
}
