export const state = () => ({
    user: {}
})

export const actions = {
        try {
            const user = await this.$fire.firestore.collection('user').doc(id).update(payload)
            commit('notification/open', { description: 'l\'utilisateur a bien été mis à jour' }, { root: true })
            return user
        } catch (error) {
            commit('notification/open', { description: 'problème lors de la mise à jour de l\'utilisateur', type: 'error' }, { root: true })
        }
    }
}
