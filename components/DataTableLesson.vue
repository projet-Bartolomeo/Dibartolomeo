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
        <Overlay
          :disabled="selected.length === 0"
          v-if="$props.message"
          type="text"
          buttonTitle="Envoyer message"
        >
          <v-text-field v-model="messageText"></v-text-field>
        </Overlay>
      </v-card-title>
    </v-card>
    <v-card class="ma-4">
      <v-data-table
        :headers="headers"
        :items="ressource"
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
            <v-card>
              <v-card-title class="text-h5 overflow-wrap-normal"
                >Etes-vous sur de vouloir supprimer ce cours ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Supprimer</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Supprimer tous</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex">
            <Overlay
              v-if="$props.message"
              class="mr-1"
              buttonTitle="mdi-message"
            >
              <v-text-field v-model="messageText"></v-text-field>
            </Overlay>
            <NuxtLink class="nuxtlink" :to="`/lesson/${item.id}`">
              <v-icon class="mr-1"> mdi-pencil </v-icon>
            </NuxtLink>
            <v-icon v-if="$props.delete" class="mr-1" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </div>
        </template>
        <template v-slot:no-data>
          <div>Il n'y a actuellement pas de cours prévu</div>
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
    delete: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      type: 'cours',
      headers: [
        {
          text: 'titre',
          value: 'title',
          initialValue: '',
          type: 'input',
          align: 'start',
        },
        {
          text: 'étudiants maximum',
          value: 'maximumStudents',
          initialValue: [],
          type: 'input',
        },

        {
          text: 'récurrence',
          value: 'recurrence',
          initialValue: [],
          type: 'input',
        },
        {
          text: "plage d'ages",
          value: 'ageRange',
          initialValue: [],
          type: 'input',
        },
        { text: 'prix', value: 'price', initialValue: [], type: 'input' },
        {
          text: 'description',
          value: 'description',
          initialValue: '',
          type: 'input',
        },
        {
          text: 'note du professeur',
          value: 'teacherNote',
          initialValue: '',
          type: 'input',
        },
        {
          text: 'début',
          value: 'startDate',
          initialValue: new Date(),
          type: 'input',
        },
        {
          text: 'fin',
          value: 'endDate',
          initialValue: new Date(),
          type: 'input',
        },
        { text: 'Actions', value: 'actions', sortable: false, type: 'switch' },
      ],
      datas: [
        {
          id: 1,
          title: 'un super cours',
          maximumStudents: 18,
          recurrence: 'tous les jours',
          ageRange: 'adulte',
          price: 16,
          description:
            "c'est vraiment une super description et en plus, bien longue",
          teacherNote: "penser à acheter de l'ocre jaune",
          startDate: '12-10-2020 10:00',
          endDate: '12-10-2020 11:15',
        },
        {
          id: 1,
          title: 'le meilleur cours',
          maximumStudents: 18,
          recurrence: 'unique',
          ageRange: 'enfant',
          price: 15,
          description:
            "c'est vraiment une super description et en plus, bien longue",
          teacherNote: 'prendre un parapluie',
          startDate: '12-20-2021 14:00',
          endDate: '12-20-2021 15:00',
        },
      ],
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
      messageText: 'draw your lines',
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
    this.defaultItem = this.editedItem = this.headers.reduce(
      (defaultItem, currentHeader) => {
        if (currentHeader.initialValue === undefined) return defaultItem
        defaultItem[currentHeader.value] = currentHeader.initialValue
        return defaultItem
      },
      {}
    )
    this.ressource = this.datas
    this.currentHeader = this.headers.reduce((newHeader, currentHeader) => {
      newHeader[currentHeader.value] = currentHeader
      return newHeader
    }, {})
  },

  methods: {
    deleteLesson(lesson) {
      console.log(lesson)
      this.deleteItemConfirm()
    },
    deleteAllLesson(lesson) {
      console.log(lesson)
      this.deleteItemConfirm()
    },
    sendMessage(lessons = this.selected) {
      console.log(lessons)
    },

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
.text-field {
  flex: none;
  display: flex;
  min-width: 200px;
  width: 24vw;
}
</style>
