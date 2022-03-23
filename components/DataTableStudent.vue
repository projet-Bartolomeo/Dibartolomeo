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
          color="#76d9a3"
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
        :show-select="$props.message"
      >
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
              class="nuxtlink d-flex justify-center align-center"
              :to="`/professor/student/${item.id}`"
            >
              <v-icon class="mr-1"> mdi-pencil </v-icon>
            </NuxtLink>

            <v-icon v-if="$props.lesson" @click="deleteStudentFromLesson(item)">
              mdi-delete
            </v-icon>

            <v-icon v-else @click="deleteFromTeacher(item)">
              mdi-delete
            </v-icon>
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
      required: true
    },
    message: {
      type: Boolean,
      required: false
    },
    lesson: {
      type: Boolean,
      required: false
    },
    add: {
      type: Boolean,
      required: false
    },
    isnew: {
      type: Boolean,
      required: false
    }
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
          align: 'start'
        },
        { text: 'Nom', value: 'lastName', initialValue: '', type: 'input' },
        {
          text: 'Prenom',
          value: 'firstName',
          initialValue: '',
          type: 'input'
        },
        { text: 'Actions', value: 'actions', sortable: false, type: 'switch' }
      ],
      search: '',
      currentHeader: {},
      singleSelect: false,
      selected: [],
      delete: []
    }
  },
  computed: {
    stateName() {
      return this.$props.isnew ? 'new' : 'details'
    }
  },

  created() {
    this.currentHeader = this.headers.reduce((newHeader, currentHeader) => {
      newHeader[currentHeader.value] = currentHeader
      return newHeader
    }, {})
  },

  methods: {
    deleteFromTeacher(student) {
      this.$store.commit('overlay/open', {
        component: 'DeleteForm',
        props: {
          dataToDelete: student,
          type: 'student'
        },
      })
    },
    deleteStudentFromLesson(student) {
      const lessonState = this.$store.state.lesson[this.stateName]
      const studentIds = [...lessonState.studentIds].filter(
        (id) => id !== student.id
      )
      const payload = { studentIds }

      this.$store.commit('overlay/open', {
        component: 'LessonModificationForm',
        props: {
          lesson: lessonState,
          modify: true,
          payload,
          student
        },
        title: lessonState.recurrenceId ? 'Voulez-vous retirer cet élève :' : ''
      })
    },

    addToLesson(student) {
      const lessonState = this.$store.state.lesson[this.stateName]
      const studentIds = [...lessonState.studentIds, student.id]
      const payload = { studentIds }

      this.$store.commit('overlay/open', {
        component: 'LessonModificationForm',
        props: {
          lesson: lessonState,
          modify: true,
          payload,
          student
        },
        title: lessonState.recurrenceId ? 'Voulez-vous ajouter cet élève :' : ''
      })
    }
  }
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
