<template>
  <div>
    <Title value="Ajouter un cours"> </Title>
    <LessonForm datas="new" />
    <DataTableStudent datas="fromLesson" lesson isnew>
      <v-btn
        style="color: white"
        color="#76d9a3"
        @click="
          $store.commit('overlay/open', {
            component: 'DataTableStudent',
            props: {
              datas: 'notInLesson',
              add: true,
              isnew: true,
            },
            title: 'Choisissez les élèves à ajouter à votre cours',
          })
        "
        >Ajouter un élève</v-btn
      >
    </DataTableStudent>
    <div class="button-icons-container">
      <v-btn
        v-if="valid"
        color="#76d9a3"
        style="color: white; width: 12vw"
        class="ma-2"
        @click="create"
        >Enregistrer
        <v-icon class="ml-2"> mdi-content-save </v-icon>
      </v-btn>
      <v-btn
        v-if="hasModifications"
        color="#f4f4f4"
        style="width: 12vw"
        class="ma-2"
        @click="$store.dispatch('lesson/resetNewForm')"
        >Rétablir
        <v-icon class="ml-2"> mdi-arrow-u-down-left </v-icon>
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
  }),
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
  methods: {
    create() {
      this.$store.dispatch('lesson/create', this.$store.state.lesson.new)
      this.$router.push('/professor/lesson/list')
    },
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
