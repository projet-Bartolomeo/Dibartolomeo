
export default {
  title: 'datatable',
  argTypes: {
    type: {
      type: 'string',
      defaultValue: 'students'
    },
    headers: {
      type: 'array',
      defaultValue: [
        { text: 'Email', value: 'email', align: 'start' },
        { text: 'Nom', value: 'lastname' },
        { text: 'Prenom', value: 'firstname' },
        { text: 'Banni', value: 'banned' },
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
    }
  }
}

export const Students = (arg, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<v-app><Datatable v-bind="$props" /></v-app>'
})
