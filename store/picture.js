import { generateRandomId } from '../services/firestoreHelper'
export const state = () => ({
   picture:'',
  })
  export const mutations = {
    set(state, { lesson, stateName }) {
      state[stateName] = lesson
    },
} 
  
export const actions = {
    async uploadPicture({ commit }, { pictureDatas }) {
        try {
            const uid = generateRandomId()
            const imageRef = this.$fire.storage.ref(uid)

            await imageRef.put(pictureDatas)
            commit('set', { stateName: 'picture', lesson:  imageRef})
           
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de l\'upload de l\'image', type: 'error' }, { root: true })
        }
       
    },

    async getPicture({ commit }, { fileName }) {
        try {
            const ref = await this.$fire.storage.ref(fileName)
            this.upload = await ref.getDownloadURL()
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération de l\'image', type: 'error' }, { root: true })
        }
    },
}