<template>
  <div>
    <LessonForm datas="details" />
    <v-row class="ma-0 justify-space-around align-center"> </v-row>
    <v-col class="mt-5">
      <DataTableStudent datas="new" lesson>
        <v-btn
          style="color: white"
          color="blue darken-1"
          class="mr-4"
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
    </v-col>
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
  async created() {
    await this.$store.dispatch('lesson/setDetails', { lessonId: this.$route.query.id })
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
</style>
