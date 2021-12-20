export const state = () => ({ open: false, description: '', type: 'success' })

export const mutations = {
    open(state, { description, type }) {
        state = Object.assign(state, {
            open: true,
            description,
            type: type ?? 'success',
        })
    },
    close(state) {
        state.open = false
    }
}
