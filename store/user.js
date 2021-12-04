export const state = () => ({
    user: {}
})

export const actions = {
    async modifyUser({ commit }, { id, payload }) {
        const user = await this.$fire.firestore.collection('user').doc(id).update(payload)
        return user
    }
}
