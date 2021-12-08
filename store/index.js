import { createStore } from 'vuex'
import {user} from '../model/User'

const store = createStore({
  state: {
    user,
    authIsReady: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('user state changed:', state.user)
    },
  },
  actions: {
    async login(context, { user }) {
     context.commit('setUser', user)
    },
    
  }
})

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setUser', user)
  unsub()
})


// export the store
export default store