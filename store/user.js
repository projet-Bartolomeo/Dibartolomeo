export const actions = {
    async createUser({ commit }, newUser) {
        const user = await this.$fire.firestore.collection('user').add(newUser)
        return user
    },

    async getUserById({ commit }, id) {
        const user = await this.$fire.firestore.collection('user').doc(id).get()
        return user.data().user
    } ,
    async updateuser({commit},id,newid){
        const actuuser= this.$fire.firestore('user').doc(id);
const user= await actuuser.update({_id:newid})
return user.data().user
    } 
}
