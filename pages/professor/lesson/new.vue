<template>
  <div>
    <LessonForm datas="new" />
    <DataTableStudent datas="fromLesson" lesson isNew>
      <v-btn
        style="color: white"
        color="teal lighten-2"
        @click="
          $store.commit('overlay/open', {
            component: 'DataTableStudent',
            props: {
              datas: 'notInLesson',
              add: true,
              isNew: true,
            },
            title: 'Choisissez les élèves à ajouter à votre cours',
          })
        "
        >Ajouter un élève</v-btn
      >
    </DataTableStudent>
    <div class="button-icons-container">
      <v-btn v-if="valid" color="grey darken-2" fab text @click="create">
        <v-icon> mdi-content-save </v-icon>
      </v-btn>
      <v-btn
        v-if="hasModifications"
        color="grey darken-2"
        fab
        text
        @click="$store.dispatch('lesson/resetNewForm')"
      >
        <v-icon> mdi-arrow-u-down-left </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    initialLesson: {},
    payload: {},
    allUser: [],
    lesson: {},
    endtHour2: '',
    startHour2: '',
    endHour1: '',
    startHour1: '',
    day: '',
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    time: null,
    menu2: false,
    modal2: false,
    recurence: ['Unique', 'Chaque semaine'],
    Age: ['Enfant', 'Adolescent', 'Adulte', 'Senior'],
    jour: [
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi',
      'Dimanche',
    ],
  }),
  methods: {
    create() {
      this.$store.dispatch('lesson/create', this.$store.state.lesson.new)
      this.$router.push('/professor/lesson/list')
    },
  },
  computed: {
    hasModifications() {
      if (this.$store.state.lesson.form.payload === undefined) return false
      return Object.keys(this.$store.state.lesson.form.payload).length > 0
    },
    valid: {
      get() {
        return this.$store.state.lesson.form.valid
      },
      set(newValue) {
        this.$store.commit('lesson/modify', {
          stateName: 'form',
          payload: { valid: newValue },
        })
      },
    },
  },
  created() {
    this.$store.dispatch('lesson/setNew')
  },
}
</script>

<style>
.hide {
  display: none;
}

.show {
  display: block;
  margin-bottom: 0 !important;
}

.input input {
  padding: 0;
  margin-top: 19px;
}

.button-icons-container {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>
