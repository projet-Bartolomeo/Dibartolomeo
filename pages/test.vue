<template>
  <div>
    <v-row class="justify-end">
      <div>{{this.$store.state.lesson.getByStudentId}}</div>
      <div>test</div>
        <DataTableLesson :datas="$store.state.lesson.getByStudentId" />
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
      this.lesson = await this.$store.dispatch('lesson/getByStudentId', 'YrGucQSEGT9Z0ctUngrX');
      this.$store.commit('lesson/setLessonsByStudentId', this.lesson)
    },



    }
}


</script>