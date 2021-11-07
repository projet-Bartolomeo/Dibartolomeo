<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="emploi_du_temps"
    show-select
    item-key="name"
    class="elevation-1"
    sort-by="calories"
  >
    
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
      <v-icon
      small
      >
        mdi-message-text
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DataTable',
  data: () => ({
    show: false,
    marker: true,
    iconIndex: 0,

    selected: [],
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Nom',
        align: 'start',
        sortable: false,
        value: 'nom'
      },
      { text: 'Prenom', value: 'prenom' },
      { text: 'Mail', value: 'email' },
      { text: 'Telephone', value: 'phone' },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    emploi_du_temps: []

  }),

  watch: {

    dialogDelete (val) {
      val || this.closeDelete()
    }
  },
  created () {
    this.initialize()
  },
  methods: {
    clearMessage () {
      this.recherche = ''
    },

    initialize () {
      this.emploi_du_temps = [
        {
          nom: 'user4',
          prenom: 'name4',
          email: 'user4@gmail.gmail.com',
          phone: '0798451120'

        },
        {
          nom: 'user3',
          prenom: 'name3',
          email: 'user3@gmail.com',
          phone: '0675498237'
        },
        {
          nom: 'user2',
          prenom: 'name2',
          email: 'user2@gmail.com',
          phone: '0789364875'
        },
        {
          nom: 'user1',
          prenom: 'name1',
          email: 'user1@gmail.com',
          phone: '0685490745'
        }
      ]
    },

    deleteItem (item) {
      this.editedIndex = this.emploi_du_temps.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.emploi_du_temps.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    }
  }
})
</script>
