<template>
  <v-card>
    <v-card-title v-if="actions.includes('search')">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Rechercher"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="filteredHeaders"
      :items="ressource"
      sort-by="calories"
      class="elevation-1"
      :footer-props="{
        'items-per-page-text': `${type}s par page`,
      }"
      :search="search"
      v-model="selected"
      :single-select="singleSelect"
      item-key="id"
      :show-select="showSelect"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Mes {{ type }}s </v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="actions.includes('create')"
                elevation="7"
                color="green"
                class="mb-2 white--text"
                v-bind="attrs"
                v-on="on"
              >
                Créer un {{ type }}
              </v-btn>
              <v-btn
                v-if="actions.includes('message')"
                :disabled="selected.length === 0"
                @click="sendMessage"
                elevation="7"
                color="green"
                class="mb-2 mr-4 white--text"
              >
                Envoyer un message
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      v-for="item in Object.entries(editedItemFiltered)"
                      :key="item[1]"
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-if="currentHeader[item[0]].type === 'input'"
                        v-model="editedItem[item[0]]"
                        :label="currentHeader[item[0]].text"
                      ></v-text-field>
                      <v-switch
                        v-if="currentHeader[item[0]].type === 'switch'"
                        v-model="editedItem[item[0]]"
                        inset
                        :label="currentHeader[item[0]].text"
                      ></v-switch>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Sauvegarder
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5 overflow-wrap-normal"
                >Etes-vous sur de vouloir supprimer cet item ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Supprimer</v-btn
                >
                <v-btn
                  v-if="actions.includes('deleteLesson')"
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm"
                  >Supprimer tous</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-if="actions !== undefined" v-slot:[`item.actions`]="{ item }">
        <v-icon
          v-if="actions.includes('message')"
          @click="sendMessage(item)"
          small
          class="mr-1"
        >
          mdi-message
        </v-icon>
        <v-icon
          v-if="actions.includes('edit')"
          small
          class="mr-1"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          v-if="actions.includes('delete')"
          small
          class="mr-1"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
        <slot v-bind:item="item"></slot>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Réinitialiser </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    datas: {
      type: Array,
      required: true,
    },
    actions: {
      type: Array,
      required: false,
    },
  },
  data () {
    return {
    showSelect: false,
    search: '',
    dialog: false,
    dialogDelete: false,
    ressource: [],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
    currentHeader: {},
    singleSelect: false,
    selected: [],
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? `Créer un ${this.type}`
        : `Modifier un ${this.type}`
    },
    editedItemFiltered() {
      delete this.editedItem.id
      return this.editedItem
    },
    filteredHeaders() {
      return this.headers.reduce((newHeaders, currentHeader) => {
        if (currentHeader.value === 'actions' && this.actions === undefined) {
          return newHeaders
        }
        newHeaders.push(currentHeader)
        return newHeaders
      }, [])
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    if (this.$props.actions.includes('message')) this.showSelect = true
    this.defaultItem = this.editedItem = this.headers.reduce(
      (defaultItem, currentHeader) => {
        if (currentHeader.initialValue === undefined) return defaultItem
        defaultItem[currentHeader.value] = currentHeader.initialValue
        return defaultItem
      },
      {}
    )
    this.ressource = this.$props.datas
    this.currentHeader = this.headers.reduce((newHeader, currentHeader) => {
      newHeader[currentHeader.value] = currentHeader
      return newHeader
    }, {})
  },

  methods: {
    sendMessage() {},

    editItem(item) {
      this.editedIndex = this.ressource.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.ressource.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.ressource.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.ressource[this.editedIndex], this.editedItem)
      } else {
        this.ressource.push(this.editedItem)
      }
      this.close()
    },
  },
}
</script>


<style>
.overflow-wrap-normal {
  word-break: break-word;
  text-align: center;
}
.nuxtlink {
  text-decoration: none;
}
</style>
