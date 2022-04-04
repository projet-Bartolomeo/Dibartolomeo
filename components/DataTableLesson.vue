<template>
  <div>
    <v-card class="ma-4 mb-6">
      <v-card-title>
        <IntervalDateFilter
          getend="lesson.filter.endDate"
          getstart="lesson.filter.startDate"
        />

        <v-text-field
          v-model="search"
          class="ma-2 text-field pa-0"
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
          color="#76d9a3"
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
        v-model="selected"
        :headers="headers"
        :items="lessons"
        sort-by="startDate"
        :sort-desc="true"
        class="elevation-1"
        :footer-props="{
          'items-per-page-text': `${type} par page`,
        }"
        :search="search"
        :single-select="singleSelect"
        item-key="id"
        :show-select="getShowSelect"
        :customsort="customsort"
      >
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <v-icon
              v-if="$props.message"
              class="mr-1"
              @click="
                $store.commit('overlay/open', {
                  component: 'MessageForm',
                  props: { recipients: [item], type: 'lesson' },
                  title: 'Tapez votre message',
                })
              "
              >mdi-message</v-icon
            >
            <NuxtLink class="nuxtlink" :to="`/professor/lesson/${item.id}`">
              <v-icon class="mr-1"> mdi-pencil </v-icon>
            </NuxtLink>
            <v-icon
              v-if="$props.delete"
              class="mr-1"
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: {
                    lesson: {
                      ...item,
                      recurrence:
                        item.recurrence === 'Chaque semaine'
                          ? 'everyWeek'
                          : 'unique',
                    },
                    archive: true,
                    redirectPath: '/professor/lesson/list',
                  },
                  title: item.recurrenceId ? 'Voulez-vous archiver :' : '',
                })
              "
            >
              mdi-delete
            </v-icon>
          </div>
        </template>
        <template #no-data> Il n'y a actuellement pas de cours prévu </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import {
  convertTimestampToReadableDate,
  convertTimestampToDate,
  convertReadableToDate,
} from '../services/dateHelper'
import { Recurrence } from '../enums/Recurrence'
import { Age } from '../enums/Age'

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
      default: '',
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
          align: 'start',
        },
        {
          text: 'Étudiants maximum',
          value: 'maximumStudents',
        },
        {
          text: 'Récurrence',
          value: 'recurrence',
        },
        {
          text: "Plage d'âges",
          value: 'ageRange',
        },
        { text: 'Prix', value: 'price' },
        {
          text: 'Début',
          value: 'startDate',
        },
        {
          text: 'Fin',
          value: 'endDate',
        },
        { text: 'Actions', value: 'actions', sortable: false },
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
    lessons() {
      return this.$store.state.lesson[this.$props.datas].reduce(
        (newlessonList, lesson) => {
          const date = convertTimestampToDate(lesson.startDate)
          const startDateTime = date.getTime()

          const startDateFilter = new Date(
            this.$store.state.lesson.filter.startDate
          ).getTime()
          const endDateFilter = new Date(
            this.$store.state.lesson.filter.endDate
          ).getTime()
          if (
            startDateTime >= startDateFilter &&
            startDateTime <= endDateFilter
          ) {
            const startDate = convertTimestampToReadableDate(lesson.startDate)
            const endDate = convertTimestampToReadableDate(lesson.endDate)
            const recurrence = Recurrence[lesson.recurrence]
            const ageRange = Age[lesson.ageRange]
            newlessonList.push({
              ...lesson,
              endDate,
              recurrence,
              ageRange,
              startDate,
            })
          }
          return newlessonList
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

    orderbyDate(first, second) {
      const firstDate = convertReadableToDate(first)
      const secondDate = convertReadableToDate(second)
      return firstDate.getTime() - secondDate.getTime()
    },

    customsort(items, index, isDesc) {
      items.sort((a, b) => {
        const [first, second] = !isDesc[0]
          ? [a[index], b[index]]
          : [b[index], a[index]]
        if (index[0] === 'startDate' || index[0] === 'endDate') {
          return this.orderbyDate(first, second)
        } else if (typeof a[index] === 'number') {
          return first - second
        } else if (typeof a[index] !== 'undefined') {
          return first.toLowerCase().localeCompare(second.toLowerCase())
        }
        return true
      })
      return items
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
