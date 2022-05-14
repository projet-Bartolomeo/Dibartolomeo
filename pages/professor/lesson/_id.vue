<template>
  <div>
    <Title value="Modifier un cours"> </Title>
    <LessonForm datas="details" />
    <DataTableStudent datas="fromLesson" lesson>
      <v-btn
        style="color: white"
        color="#76d9a3"
        @click="
          $store.commit('overlay/open', {
            component: 'DataTableStudent',
            props: {
              datas: 'notInLesson',
              add: true,
            },
            title: 'Choisissez les élèves à ajouter à votre cours',
          })
        "
        >Ajouter un élève</v-btn
      >
    </DataTableStudent>
    <div v-if="hasModifications && valid" class="button-icons-container">
      <v-btn
        color="#76d9a3"
        style="color: white"
        class="ma-2"
        @click="
          $store.commit('overlay/open', {
            component: 'LessonModificationForm',
            props: {
              lesson: $store.state.lesson.details,
              payload: $store.state.lesson.form.payload,
              modify: true,
            },
            title: lesson.recurrenceId ? 'Voulez-vous enregistrer :' : '',
          })
        "
        >Enrregistrer
        <v-icon class="ma-2"> mdi-content-save </v-icon>
      </v-btn>
      <v-btn
        color="#f4f4f4"
        class="ma-2"
        @click="
          $store.dispatch('resetEditionForm', {
            storeName: 'lesson',
            stateName: 'details',
          })
        "
        >Rétablir
        <v-icon class="ma-2"> mdi-arrow-u-down-left </v-icon>
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
  computed: {
    valid() {
      return this.$store.state.lesson.form.valid
    },
    hasModifications() {
      if (this.$store.state.lesson.form.payload === undefined) return false
      return Object.keys(this.$store.state.lesson.form.payload).length > 0
    },
  },
  async created() {
    this.$store.dispatch('resetEditionForm', {
      storeName: 'lesson',
      stateName: 'details',
    })
    await this.$store.dispatch('lesson/setDetails', {
      lessonId: this.$route.params.id,
    })
  },

  methods: {
    HideShow(idHide, idShow, iconHide, iconShow) {
      idHide.className = 'hide'
      idShow.className = 'show'
      iconHide.className = 'hide'
      iconShow.className = 'show'
    },

    showSave(field, value) {
      this.$refs.enregistrer.className = 'show'
      this.addToPayload(field, value)
    },

    addToPayload(field, value) {
      this.payload = { ...this.payload, [field]: value }
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
