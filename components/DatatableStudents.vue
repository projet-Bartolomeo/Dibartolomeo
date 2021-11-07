<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="emploi_du_temps"
    :search="search"
    show-select
    item-key="name"
    class="elevation-1"
    sort-by="calories"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <!-- <v-toolbar-title>COURS</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider> -->
        <v-spacer></v-spacer>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="search"
                  hide-actions
                  :append-outer-icon="recherche ? 'mdi-send' : 'mdi-microphone'"
                  filled
                  clear-icon="mdi-close-circle"
                  clearable
                  outlined
                  type="text"
                  @click:clear="clearMessage"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title class="text-h5"
              >Est-vous sur de vouloir supprimer ce cours ?</v-card-title
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
      </v-toolbar>
       <v-overlay :value="open">
      <div class="d-flex justify-end">
        <button @click="open = !open" class="popup-close">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <send-message /> 
      </v-overlay>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      <v-icon small @click="open = !open"> mdi-message-text </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  name: 'DataTable',
  data: () => {
    return {
      open: false,
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
