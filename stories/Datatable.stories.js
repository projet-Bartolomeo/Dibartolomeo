
export default {
  title: 'datatable',
  argTypes: {
    type: {
      type: 'string',
      defaultValue: 'élève'
    },
    headers: {
      type: 'array',
      defaultValue: [
        { text: 'Email', value: 'email', initialValue: '', type: 'input', align: 'start' },
        { text: 'Nom', value: 'lastname', initialValue: '', type: 'input' },
        { text: 'Prenom', value: 'firstname', initialValue: '', type: 'input' },
        { text: 'Banni', value: 'banned', initialValue: false, type: 'switch' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    },
    datas: {
      type: 'array',
      defaultValue: [
        {
          id: 1,
          email: 'mattis.beaugendre@gmail.com',
          lastname: 'Mattis',
          firstname: 'Beaugendre',
          banned: false
        },
        {
          id: 2,
          email: 'chris.redfield@gmail.com',
          lastname: 'Chris',
          firstname: 'Redfiled',
          banned: false
        },
        {
          id: 3,
          email: 'Mathieu.Pocong@gmail.com',
          lastname: 'Mathieu',
          firstname: 'Pocong',
          banned: false
        },
      ]
    },
    actions: {
      type: 'array',
      defaultValue: [
        'message',
        'create',
        'edit',
        'delete',
        'details',
        'deleteLesson',
        'search'
      ]
    }
  }
}

export const Base = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<v-app><Datatable v-bind="$props" /></v-app>'
})
