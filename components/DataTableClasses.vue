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
        <v-dialog v-model="dialogDelete" max-width="550px">
          <v-card>
            <v-card-title class="text-h5"
              >Êtes-vous sûr de vouloir supprimer ce cours ?</v-card-title
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
        <Overlay />
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
      dialog: false,
      show: false,
      marker: true,
      iconIndex: 0,
      search: '',
      selected: [],
      dialogDelete: false,
      headers: [
        {
          text: 'Nom',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Horraire', value: 'horraire' },
        { text: 'Description', value: 'description' },
        { text: 'Prix', value: 'prix' },
        { text: "Nbr inscrit / Nbr d'élèves", value: 'nbr' },
        { text: 'Note', value: 'note' },
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
          name: 'Les Petits',
          horraire: 'Lundi',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed ex vitae eros tincidunt iaculis ac eu lacus. Aenean at nisi feugiat, venenatis purus nec, hendrerit arcu. Aenean sit amet',
          prix: 24,
          nbr: '5/20',
          note: 'Lorem ipsum dolor sit amet, consectet',
        },
        {
          name: 'Les Grands',
          horraire: 'Mardi - 16H30',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed ex vitae eros tincidunt iaculis ac eu lacus. Aenean at nisi feugiat, venenatis purus nec, hendrerit arcu. Aenean sit amet',
          prix: 24,
          nbr: '18/20',
          note: 'Lorem ipsum dolor sit amet, consectet',
        },
        {
          name: "Peinture a l'huile",
          horraire: '1/10 - 12H',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed ex vitae eros tincidunt iaculis ac eu lacus. Aenean at nisi feugiat, venenatis purus nec, hendrerit arcu. Aenean sit amet',
          prix: 12,
          nbr: '10/20',
          note: 'Lorem ipsum dolor sit amet, consectet',
        },
        {
          name: "Peinture à l'eau",
          horraire: 'Jeudi',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed ex vitae eros tincidunt iaculis ac eu lacus. Aenean at nisi feugiat, venenatis purus nec, hendrerit arcu. Aenean sit amet',
          prix: 5,
          nbr: '20/20',
          note: 'Lorem ipsum dolor sit amet, consectet',
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