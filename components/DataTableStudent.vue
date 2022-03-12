<template>
  <div>
    <v-card class="ma-4 mb-6">
      <v-card-title>
        <v-text-field
          v-model="search"
          class="ma-2 text-field pa-0"
          append-icon="mdi-magnify"
          label="Rechercher un élève"
          single-line
          hide-details
          clearable
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn
          v-if="$props.message"
          :disabled="selected.length === 0"
          style="color: white"
          color="teal lighten-2"
          @click="
            $store.commit('overlay/open', {
              component: 'MessageForm',
              props: { recipients: selected, type: 'student' },
              title: 'Tapez votre message',
            })
          "
          >Envoyer message</v-btn
        >
        <slot></slot>
      </v-card-title>
    </v-card>
    <v-card class="ma-4">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="student"
        sort-by="calories"
        class="elevation-1"
        :footer-props="{
          'items-per-page-text': 'élève par page',
        }"
        :search="search"
        :single-select="singleSelect"
        item-key="id"
        :show-select="getShowSelect"
      >
        <template #top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card v-if="$props.lesson">
              <v-card-title class="text-h5 overflow-wrap-normal"
                >Êtes-vous sur de vouloir supprimer cet élève de votre cours
                ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn
                  color="blue-grey darken-1"
                  text
                  @click="deleteItemConfirm"
                  >Supprimer</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
            <v-card v-else>
              <v-card-title class="overflow-wrap-normal"
                >Êtes-vous sur de vouloir supprimer cet élève?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn
                  color="blue-grey darken-1"
                  text
                  @click="deleteItemConfirm"
                  >Supprimer</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <template v-if="$props.add" #[`item.actions`]="{ item }">
          <v-icon class="mr-1" @click="addToLesson(item)"> mdi-plus </v-icon>
        </template>
        <template v-else #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-icon
              v-if="$props.message"
              class="mr-1"
              @click="
                $store.commit('overlay/open', {
                  component: 'MessageForm',
                  props: { recipients: [item], type: 'student' },
                  title: 'Tapez votre message',
                })
              "
              >mdi-message</v-icon
            >
            <NuxtLink
              class="nuxtlink"
              :to="`/professor/student/?id=${item.id}`"
            >
              <v-icon class="mr-1"> mdi-pencil </v-icon>
            </NuxtLink>
            <v-icon class="mr-1" @click="deleteItem(item)"> mdi-delete </v-icon>
          </div>
        </template>
        <template #no-data>
          <div>Vous n'avez actuellement pas d'élèves</div>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    datas: {
      type: String,
      required: true,
    },
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
    isNew: {
      type: Boolean,
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
      dialogDelete: false,
      editedIndex: -1,
      editedItem: {},
      currentHeader: {},
      singleSelect: false,
      selected: [],
      messageText: 'draw you lines',
      delete: [],
    }
  },
  computed: {
    student() {
      return this.$store.state.student[this.$props.datas].reduce(
        (newstudentList, student) => {
          if (student.isRegistered === true) {
            const isRegistered = 'Oui'
            newstudentList.push({
              ...student,
              isRegistered,
            })
          } else {
            const isRegistered = 'Non'
            newstudentList.push({
              ...student,
              isRegistered,
            })
          }

          return newstudentList
        },
        []
      )
    },

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
    this.currentHeader = this.headers.reduce((newHeader, currentHeader) => {
      newHeader[currentHeader.value] = currentHeader
      return newHeader
    }, {})
  },

  methods: {
    deleteItem(item) {
      this.editedItem = item
      this.dialogDelete = true
    },

    deleteStudentFromLesson() {
      this.deleteItemConfirm()
    },

    async remove() {
      await this.$store.dispatch('student/removeFromTeacher', {
        student: this.editedItem,
      })
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
        this.editedIndex = -1
      })
    },

    deleteItemConfirm() {
      if (this.$props.lesson === false) {
        this.remove()
      } else {
        this.$store.dispatch('lesson/removeStudentFromLesson', {
          student: this.editedItem,
          stateName: this.$props.isNew ? 'new' : 'details',
          notUpdateInDatabase: this.$props.isNew,
        })
      }
      this.closeDelete()
    },

    async addToLesson(student) {
      await this.$store.dispatch('lesson/addStudentInLesson', {
        student,
        stateName: this.$props.isNew ? 'new' : 'details',
        notUpdateInDatabase: this.$props.isNew,
      })
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
