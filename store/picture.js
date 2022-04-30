import { generateRandomId } from '../services/firestoreHelper'

export const state = () => ({
    lessonPictureSelected: undefined,
    newPictureSelected: undefined,
    oldLessonPicture: undefined,
})

export const mutations = {
    set(state, { picture, stateName }) {
        state[stateName] = picture
    }
}

export const actions = {
    async upload({ commit, state }, { uid }) {
        try {
            if (uid === undefined || uid === process.env.defaultCoverPictureName) return
            const imageRef = this.$fire.storage.ref(uid)
            await imageRef.put(state.lessonPictureSelected)
            commit('set', { stateName: 'lessonPictureSelected', picture: imageRef })
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de l\'upload de l\'image', type: 'error' }, { root: true })
        }
    },

    async setFromLesson({ commit, dispatch }, { fileName }) {
        const picture = await dispatch('get', { fileName })
        commit('set', { stateName: 'lessonPictureSelected', picture })
        commit('set', { stateName: 'newPictureSelected', picture: undefined })
        commit('set', { stateName: 'oldLessonPicture', picture })
    },

    get({ commit }, { fileName }) {
        try {
            const coverPicture = `https://firebasestorage.googleapis.com/v0/b/${process.env.projectId}.appspot.com/o/${fileName}?alt=media`
            return coverPicture
        } catch (error) {
            commit('notification/create', { description: 'Problème lors de la récupération de l\'image', type: 'error' }, { root: true })
        }
    },

    resetEditionForm({ commit, state }) {
        if (state.oldLessonPicture) commit('set', { stateName: 'lessonPictureSelected', picture: state.oldLessonPicture })
        commit('set', { stateName: 'newPictureSelected', picture: undefined })
    },

    setNew({ commit, rootState }, { newPicture, initialPictureValue, fieldName }) {
        commit('set', { stateName: 'oldLessonPicture', picture: initialPictureValue })
        commit('set', { picture: URL.createObjectURL(newPicture), stateName: 'newPictureSelected' })
        commit('set', { picture: newPicture, stateName: fieldName })
        commit('lesson/modify', {
            payload: { payload: { ...rootState.lesson.form.payload, coverPicture: generateRandomId() } },
            stateName: 'form',
        }, { root: true })
    }
}
