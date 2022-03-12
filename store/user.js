export const state = () => ({
    id: 'm4LAKiljhevFTHr1wk69',
    type:'student'
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
    }
}
