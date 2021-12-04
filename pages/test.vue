<template>
  <div>
    <v-row class="justify-end">
      <div>{{test}}</div>
      <div>test</div>
    </v-row>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      user: {},
      test : {}
    };
  },
  created() {
    this.fetchData();
  },
    methods : {
      async fetchData() {
      this.user = await this.$store.dispatch('students/getAllStudents');
      this.test = await this.$store.dispatch('students/GetStudentByTeacherId');
    },
    }
}


</script>