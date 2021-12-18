export const state = () => ({ open: false, component: '', props: {}, title: '' })

export const mutations = {
    open(state, { component, props, title }) {
        state = Object.assign(state, {
            open: true,
            component,
            props,
            title: title ?? '',
        })
    },
    close(state) {
        state.open = false
    }
}
