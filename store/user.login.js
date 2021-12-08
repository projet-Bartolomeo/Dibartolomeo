import { user } from '../model/User';
export const
    state = () => ({
        user,
    })

export const actions = {
    signup(context, { user }) {
        context.commit('setUser', user)
    },
    login(context, { user }) {
        context.commit('setUser', user)

    },
    setUser(state, payload) {
        state.user = payload
        console.log('user state changed:', state.user)
    },
    setAuthIsReady(state, payload) {
        state.authIsReady = payload
    }
}

