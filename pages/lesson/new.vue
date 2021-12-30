<template>
  <div>
    <LessonForm datas="new" />
    <!-- <DataTableStudent datas="new" lesson>
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
    </DataTableStudent> -->
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
