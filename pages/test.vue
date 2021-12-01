<template>
  <div>
    <v-row class="justify-end">
      <div>{{user}}</div>
      <div>test</div>
    </v-row>
  </div>
</template>

<script>
  export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.fetchData();
  },
    methods : {
      async fetchData() {
      this.user = await this.$store.dispatch('students/getAllStudents');
    },
    }
}


</script>