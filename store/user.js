export const state = () => ({
    user: {},
    newUser: {},
    login:{}
})

export const mutations = {
    setNewUser(state, newUser) {
        const datas = Object.entries(newUser).reduce((datas, [key, data]) => {
            if (key === 'email') return datas
            return { ...datas, [key]: data }
          }, {})
        state.newUser = { id: newUser.email, datas }
    },
    setlogin(state, login) {
        state.login = login
    }
}

export const actions = {
    async modifyUser({ commit }, { id, payload }) {
        const user = await this.$fire.firestore.collection('user').doc(id).update(payload)
        return user
    }
}

