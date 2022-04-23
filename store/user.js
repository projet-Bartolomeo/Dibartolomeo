export const state = () => ({
    connected: {
    }
})

export const mutations = {
    set(state, { user, stateName }) {
        state[stateName] = user
    },

}

export const actions = {
    async modify({ commit }, { id, payload }) {
        try {
            await this.$fire.firestore.collection('user').doc(id).update(payload)
            commit('notification/create', { description: 'l\'utilisateur a bien été mis à jour' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la mise à jour de l\'utilisateur', type: 'error' }, { root: true })
        }
    },
    async register({ commit }, { newUser, password }) {
        try {
            const { user } = await this.$fire.auth.createUserWithEmailAndPassword(newUser.email, password)
            const id = user.uid
            await this.$fire.firestore.collection('user').doc(id).set(newUser)
            commit('set', { user: { ...newUser, id }, stateName: 'connected' })
            commit('notification/create', { description: 'votre compte a été créé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'problème lors de la création de votre compte', type: 'error' })
        }
    },

    async login({ commit }, { email, password }) {
        try {
            const { user } = await this.$fire.auth.signInWithEmailAndPassword(email, password)
            const connectedUser = await this.$fire.firestore.collection('user').doc(user.uid).get()
            const id = user.uid
            commit('set', { user: { ...connectedUser.data(), id }, stateName: 'connected' })
            commit('notification/create', { description: 'votre compte a été créé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Email ou mot de passe invalide', type: 'error' }, { root: true })
        }
    },

    async resetPassword({ commit }, { password }) {
        try {
            const user = await this.$fire.auth.currentUser
            await user.updatePassword(password)
            commit('notification/create', { description: 'Votre mot de passe a été changé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Impossible de modifier le mot de passe', type: 'error' }, { root: true })
        }
    }

}