
export default {
  title: 'datatableStudent',
  argTypes: {
    message: {
      options: [undefined, 'true'],
      control: { type: 'select' }
    },
    lesson: {
      options: [undefined, 'true'],
      control: { type: 'select' }
    },
    add: {
      options: [undefined, 'true'],
      control: { type: 'select' }
    }
  }
}

export const datatableStudent = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<v-app><DataTableStudent v-bind="$props" /></v-app>'
})
