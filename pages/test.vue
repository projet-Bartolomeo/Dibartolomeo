<template>
  <div>
    <v-row class="justify-end">
      <div>{{this.$store.state.lesson.getLessonsByStudentId}}</div>
      <div>test</div>
        <DataTableLesson :datas="$store.state.lesson.getLessonsByStudentId" />
    </v-row>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      lesson: [],
    }
  },
  created() {
    this.fetchData();
  },
    methods : {
      async fetchData() {
      this.lesson = await this.$store.dispatch('lesson/getLessonsByStudentId', 'YrGucQSEGT9Z0ctUngrX');
      this.$store.commit('lesson/setLessonsByStudentId', this.lesson)
    },



    }
}


</script>