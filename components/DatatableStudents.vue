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
    <template #top>
      <v-dialog v-model="dialogDelete" class="dialog" width="50vw">
        <v-card>
          <v-card-title class="text-h5 text-center"
            >Êtes-vous sûr de vouloir supprimer cet élève d'un cours
            ?</v-card-title
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
    </template>
    <template #[`item.actions`]="{ item }">
      <div class="d-flex">
        <Overlay
          buttonTitle="mdi-message-text"
          overlayTitle="Envoyer un message"
        >
          <v-col class="d-flex flex-column align-center">
            <v-textarea
              class="text-area"
              filled
              auto-grow
              name="input-7-4"
              label="Entrez votre message ici"
              style="width: 30vw"
            ></v-textarea>
            <v-btn style="color: white" color="teal lighten-2">Envoyer</v-btn>
          </v-col>
        </Overlay>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </div>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  data: () => {
    return {
      idProf : '0kK1fyyWN8N2bkHNYLoo',
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
          value: 'lastName',
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
    this.fetchData()
  },
  methods: {
    clearMessage() {
      this.search = ''
    },

      async fetchData() {
      this.emploi_du_temps = await this.$store.dispatch('students/GetStudentByTeacherId' , '0kK1fyyWN8N2bkHNYLoo');
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
}
</script>

<style scoped>
.text-area {
  width: 70%;
}
</style>