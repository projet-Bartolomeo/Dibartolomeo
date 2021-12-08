export const actions = {
    async envoieMessage({ commit }, Message) {
        const message = await this.$fire.firestore.collection('Message').add(Message)
        return message
    },
}