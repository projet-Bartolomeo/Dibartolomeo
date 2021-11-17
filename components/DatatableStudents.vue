<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="emploi_du_temps"
    :search="search"
    show-select
    item-key="id"
    class="elevation-1"
  >
    <template v-slot:top>
        <v-dialog v-model="dialogDelete" max-width="680px">
          <v-card>
            <v-card-title class="text-h5"
              >Êtes-vous sûr de vouloir supprimer cet élève d'un cours ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Annuler</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <v-dialog v-model="dialog" width="700">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <send-message />
      </v-card>
    </v-dialog>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="dialog = !dialog"> mdi-message-text </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DataTable',
  data: () => {
    return {
      show: false,
      marker: true,
      iconIndex: 0,
      search: '',
      selected: [],
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Prenom', value: 'prenom' },
        { text: 'Mail', value: 'mail' },
        { text: 'Telephone', value: 'telephone', align: 'start' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],

      emploi_du_temps: [],
    }
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  created() {
    this.initialize()
  },
  methods: {
    clearMessage() {
      this.search = ''
    },

    initialize() {
      this.emploi_du_temps = [
        {
          id : 1,
          display: false,
          name: 'Beaugendre',
          prenom: 'Mattis',
          mail: 'mattis.beaugendre@gmail.com',
          telephone: '07 77 77 77 77',
        },
        {
          id : 2,
          display: false,
          name: 'Beaugendre',
          prenom: 'Mattis',
          mail: 'mattis.beaugendre@gmail.com',
          telephone: '07 77 77 77 77',
        },    
        {
          id : 3,
          display: false,
          name: 'Beaugendre',
          prenom: 'Mattis',
          mail: 'mattis.beaugendre@gmail.com',
          telephone: '07 77 77 77 77',
        },    
        {
          id : 4,
          display: false,
          name: 'Beaugendre',
          prenom: 'Mattis',
          mail: 'mattis.beaugendre@gmail.com',
          telephone: '07 77 77 77 77',
        },
      ]
    },

    deleteItem(item) {
      this.editedIndex = this.emploi_du_temps.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm() {
      this.emploi_du_temps.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
})
</script>
