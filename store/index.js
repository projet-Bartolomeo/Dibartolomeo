export const getters = {
    getStateFromString: (state) => (stateToConvert) => {
        const stateInformation = stateToConvert.split('.')
        return {
            storeName: stateInformation[0],
            stateName: stateInformation[1],
            fieldName: stateInformation[2],
            value: state[stateInformation[0]][stateInformation[1]][stateInformation[2]],
        }
    }
}
