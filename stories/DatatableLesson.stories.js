
export default {
  title: 'datatableLesson',
  argTypes: {
    message: {
      options: [undefined, 'true'],
      control: { type: 'select' }
    },
    delete: {
      options: [undefined, 'true'],
      control: { type: 'select' }
    },
    getLessonById: {
      options: [undefined, 'true'],
      control: { type: 'select' }
    }
  }
}

export const datatableLesson = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<v-app><DataTableLesson v-bind="$props" /></v-app>'
})
