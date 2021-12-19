<template>
  <div>
    <v-card class="ma-4 mb-6">
      <v-card-title>
        <v-text-field
          class="ma-2 text-field pa-0"
          v-model="search"
          append-icon="mdi-magnify"
          :label="`Rechercher un ${type}`"
          single-line
          hide-details
          clearable
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$props.message"
          :disabled="selected.length === 0"
          style="color: white"
          color="blue darken-1"
          @click="
            $store.commit('overlay/open', {
              component: 'MessageForm',
              props: { recipients: selectedId, type: 'student' },
              title: 'Tapez votre message',
            })
          "
          >send message</v-btn
        >
        <slot></slot>
      </v-card-title>
    </v-card>
    <v-card class="ma-4">
      <v-data-table
        :headers="headers"
        :items="$props.datas"
        sort-by="calories"
        class="elevation-1"
        :footer-props="{
          'items-per-page-text': `${type} par page`,
        }"
        :search="search"
        v-model="selected"
        :single-select="singleSelect"
        item-key="id"
        :show-select="getShowSelect"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
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
                      <div v-if="currentHeader[item[0]] !== undefined">
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
                      </div>
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
            <v-card v-if="$props.lesson">
              <v-card-title class="text-h5 overflow-wrap-normal"
                >Etes-vous sur de vouloir supprimer cet élève de votre cours
                ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteStudentFromLesson"
                  >Supprimer</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
            <v-card v-else>
              <v-card-title class="text-h5 overflow-wrap-normal"
                >Etes-vous sur de vouloir supprimer cet élève?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteStudent"
                  >Supprimer</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-if="$props.add" v-slot:[`item.actions`]="{ item }">
          <v-icon class="mr-1" @click="addToLesson(item)"> mdi-plus </v-icon>
        </template>
        <template v-else v-slot:[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-icon
              v-if="$props.message"
              class="mr-1"
              @click="
                $store.commit('overlay/open', {
                  component: 'MessageForm',
                  props: { recipients: [item.id], type: 'student' },
                  title: 'Tapez votre message',
                })
              "
              >mdi-message</v-icon
            >
            <NuxtLink class="nuxtlink" :to="`/student/${item.id}`">
              <v-icon class="mr-1"> mdi-pencil </v-icon>
            </NuxtLink>
            <v-icon class="mr-1" @click="deleteItem(item)"> mdi-delete </v-icon>
          </div>
        </template>
        <template v-slot:no-data>
          <div>Vous n'avez actuellement pas d'élèves</div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: Boolean,
      required: false,
    },
    lesson: {
      type: Boolean,
      required: false,
    },
    add: {
      type: Boolean,
      required: false,
    },
    datas: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      users: [],
      type: 'élève',
      headers: [
        {
          text: 'Email',
          value: 'email',
          initialValue: '',
          type: 'input',
          align: 'start',
        },
        { text: 'Nom', value: 'lastName', initialValue: '', type: 'input' },
        {
          text: 'Prenom',
          value: 'firstName',
          initialValue: '',
          type: 'input',
        },
        { text: 'Actions', value: 'actions', sortable: false, type: 'switch' },
      ],
      showSelect: false,
      search: '',
      dialog: false,
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      defaultItem: {},
      currentHeader: {},
      singleSelect: false,
      selected: [],
      messageText: 'draw you lines',
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
    getShowSelect() {
      if (this.$props.message) return true
      return false
    },
    selectedId() {
      return this.selected.map((select) => select.id)
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
    this.users = this.datas
    this.defaultItem = this.editedItem = this.headers.reduce(
      (defaultItem, currentHeader) => {
        if (currentHeader.initialValue === undefined) return defaultItem
        defaultItem[currentHeader.value] = currentHeader.initialValue
        return defaultItem
      },
      {}
    )
    this.currentHeader = this.headers.reduce((newHeader, currentHeader) => {
      newHeader[currentHeader.value] = currentHeader
      return newHeader
    }, {})
  },

  methods: {
    deleteStudentFromLesson() {
      this.deleteItemConfirm()
    },
    addToLesson(student) {},
    editItem(item) {
      this.editedIndex = this.user.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.user.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.user.splice(this.editedIndex, 1)
      this.closeDelete()
    },
    deleteStudent() {
      this.deleteItemConfirm()
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
        Object.assign(this.user[this.editedIndex], this.editedItem)
      } else {
        this.user.push(this.editedItem)
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
.text-field {
  flex: none;
  display: flex;
  min-width: 200px;
  width: 24vw;
}
</style>
