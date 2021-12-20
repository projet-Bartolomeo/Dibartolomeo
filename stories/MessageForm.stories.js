
export default {
    title: 'MessageForm',
    argTypes: {
        recipients: {
            control: { type: 'array' }
        },
        type: {
            options: ['lesson', 'user'],
            control: { type: 'select' }
        },
    }
}

export const withoutMessage = (arg, { argTypes }) => ({
    props: Object.keys(argTypes),
    template: '<v-app><MessageForm v-bind="$props" /></v-app>'
})
