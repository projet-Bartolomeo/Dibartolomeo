export const mutations = {
    deleteSubField(state, { stateName, fieldName, storeName, subField }) {
        state[storeName][stateName][fieldName] = Object.entries(state[storeName][stateName][fieldName])
            .reduce((newState, [currentKey, currentField]) => {
                if (subField !== currentKey) return { ...newState, [currentKey]: currentField }
                return newState
            }, {})
    },
}

export const getters = {
    getStateFromString: (state) => (stateToConvert) => {
        const stateInformation = stateToConvert.split('.')
        if(stateInformation.length === 2) {
            return {
                storeName: stateInformation[0],
                fieldName: stateInformation[1],
                value: state[stateInformation[0]][stateInformation[1]],
            }
        }
        if(stateInformation.length === 3) {
            return {
                storeName: stateInformation[0],
                stateName: stateInformation[1],
                fieldName: stateInformation[2],
                value: state[stateInformation[0]][stateInformation[1]][stateInformation[2]],
            }
        }
        return {
            storeName: stateInformation[0],
            stateName: stateInformation[1],
            index: stateInformation[2],
            fieldName: stateInformation[3],
            value: state[stateInformation[0]][stateInformation[1]][stateInformation[2]][stateInformation[3]],
        }
    }
}

export const actions = {
    setFormField({ state, commit }, { stateInformations, newValue }) {
        const { stateName, fieldName, storeName, value } = stateInformations
        commit(`${storeName}/modify`, {
            payload: { [fieldName]: newValue },
            stateName,
        })

        const oldValues = state[storeName].form.oldValues
        const isNotChanged = oldValues !== undefined &&
            oldValues[fieldName] !== undefined &&
            oldValues[fieldName].toString() === newValue.toString()

        if (isNotChanged) {
            commit('deleteSubField', { stateName: 'form', fieldName: 'payload', storeName, subField: fieldName })
            commit('deleteSubField', { stateName: 'form', fieldName: 'oldValues', storeName, subField: fieldName })
        } else {
            commit(`${storeName}/modify`, {
                payload: { payload: { ...state[storeName].form.payload, [fieldName]: newValue } },
                stateName: 'form',
            })
            const isDefined = state[storeName].form.oldValues !== undefined && state[storeName].form.oldValues[fieldName] !== undefined
            if (isDefined) return
            commit(`${storeName}/modify`, {
                payload: { oldValues: { ...state[storeName].form.oldValues, [fieldName]: value ?? '' } },
                stateName: 'form',
            })
        }
    },

    resetEditionForm({ commit, rootState, dispatch }, { storeName, stateName }) {
        const oldValues = rootState[storeName].form.oldValues
        commit(`${storeName}/modify`, { stateName, payload: oldValues })
        commit(`${storeName}/set`, {
            stateName: 'form',
            lesson: { valid: true },
        })
        dispatch('picture/resetEditionForm')
    },
}
