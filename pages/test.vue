<template>
  <div>
    <v-row class="justify-end">
      <div>{{user}}</div>
      <div>test</div>
      <v-btn @click="afficheStudents()">Clic</v-btn>
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
      this.user = await this.$store.dispatch('storeStudents/getAllStudent');
    },
          afficheStudents(){
        console.log(this.$store.state.storeStudents.students)

      }
    }
}


</script>