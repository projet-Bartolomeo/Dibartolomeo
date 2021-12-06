export const state = () => ({
    user: {},
})
export const actions = {
    async createUser({ commit }, newUser) {
        const user = await this.$fire.firestore.collection('user').add(newUser)
        return user
    },

    async getUserById({ commit }, id) {
        const user = await this.$fire.firestore.collection('user').doc(id).get()
        return user.data().user
    },
   
    async getUserByemail({ commit }, email) {
        const alluser = await this.$fire.firestore.collection('user').doc(email).get();
        return alluser
    },
    async Countemail({ commit }, email) {
        const query = await this.$fire.firestore.collection("user").doc(email).size;
        return query
        
    },
}
