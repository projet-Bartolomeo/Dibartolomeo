export const state = () => ({
    connected: {}
})

export const mutations = {
    set(state, { user, stateName }) {
        state[stateName] = user
    },
    logout(state) {
        state.connected = {}
    },
}

export const actions = {
    async register({ commit }, { newUser, password }) {
        try {
            const { user } = await this.$fire.auth.createUserWithEmailAndPassword(newUser.email, password)
            const id = user.uid
            const userToSave = { ...newUser, teacherIds: [], isRegistered: false, isDeleted: false }
            await this.$fire.firestore.collection('user').doc(id).set(userToSave)
            commit('set', { user: { ...userToSave, id }, stateName: 'connected' })
            commit('notification/create', { description: 'Votre compte a été créé' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la création de votre compte', type: 'error' }, { root: true })
        }
    },

    async login({ commit }, { email, password }) {
        try {
            const { user } = await this.$fire.auth.signInWithEmailAndPassword(email, password)
            const connectedUser = await this.$fire.firestore.collection('user').doc(user.uid).get()
            const id = user.uid
            commit('set', { user: { ...connectedUser.data(), id }, stateName: 'connected' })
            commit('notification/create', { description: 'Vous êtes connecté' }, { root: true })
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
    },

    async forgotPassword({ commit }, { email }) {
        try {
            await this.$fire.auth.sendPasswordResetEmail(email)
            commit('notification/create', { description: 'Un mail a été envoyer pour réinitialiser le mot de passe' }, { root: true })
        } catch (error) {
            commit('notification/create', { description: 'Impossible d\'envoyer le mail', type: 'error' }, { root: true })
        }
    },
}
