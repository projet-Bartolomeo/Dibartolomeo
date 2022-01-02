<template>
  <div>
    <v-card class="ma-4 mb-6">
      <v-card-title>
        <IntervalDateFilter
          getEnd="lesson.filter.endDate"
          getStart="lesson.filter.startDate"
        />

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
          color="teal lighten-2"
          @click="
            $store.commit('overlay/open', {
              component: 'MessageForm',
              props: { recipients: selected, type: 'lesson' },
              title: 'Tapez votre message',
            })
          "
          >Envoyer message</v-btn
        >
      </v-card-title>
    </v-card>
    <v-card class="ma-4">
      <v-data-table
        :headers="headers"
        :items="items"
        sort-by="startDate"
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
        <template v-slot:[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-icon
              class="mr-1"
              v-if="$props.message"
              @click="
                $store.commit('overlay/open', {
                  component: 'MessageForm',
                  props: { recipients: [item.id], type: 'lesson' },
                  title: 'Tapez votre message',
                })
              "
              >mdi-message</v-icon
            >
            <NuxtLink class="nuxtlink" :to="`/lesson/?id=${item.id}`">
              <v-icon class="mr-1"> mdi-pencil </v-icon>
            </NuxtLink>
            <v-icon
              v-if="$props.delete"
              class="mr-1"
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: {
                    lesson: item,
                    archive: true,
                  },
                  title: item.recurrenceId ? 'Voulez-vous archiver :' : '',
                })
              "
            >
              mdi-delete
            </v-icon>
          </div>
        </template>
        <template v-slot:no-data>
          Il n'y a actuellement pas de cours prévu
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
    datas: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      open: false,
      type: 'cours',
      headers: [
        {
          text: 'Titre',
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
      startDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      startDateMenu: false,
      endDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      endDateMenu: false,
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
    items() {
      if (!this.$store.state.lesson[this.$props.datas]) return []
      const filteredDatas = this.$store.state.lesson[this.$props.datas].filter(
        (lesson) => {
          const startDate = new Date(lesson.startDate).getTime()
          const startDateFilter = new Date(
            this.$store.state.lesson.filter.startDate
          ).getTime()
          const endDateFilter = new Date(
            this.$store.state.lesson.filter.endDate
          ).getTime()
          return startDate >= startDateFilter && startDate <= endDateFilter
        }
      )
      return filteredDatas
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
    this.defaultItem = this.headers.reduce((defaultItem, currentHeader) => {
      if (currentHeader.initialValue === undefined) return defaultItem
      defaultItem[currentHeader.value] = currentHeader.initialValue
      return defaultItem
    }, {})
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

    deleteItemConfirm() {
      const all = this.editedItem.recurrenceId !== undefined
      this.$store.dispatch('lesson/archive', { lesson: this.editedItem, all })
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
