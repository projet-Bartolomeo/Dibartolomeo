<template>
  <div>
    <div class="header">
      <Title value="Mes Cours enregistrés" />
      <v-btn color="#41c6a9" class="white--text" elevation="2" x-large
        >Filtrer<v-icon right> mdi-filter-variant </v-icon></v-btn
      >
    </div>
    <div class="listCard">
      <div v-for="card in $store.state.lesson.studentList" :key="card.title">
        <CardStudentLesson
          :title="card.title"
          :date="card.date"
          :description="card.description"
        />
        <div>
          <v-divider class="separator"></v-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('lesson/setStudentList', this.$store.state.user.id)
  },
}
</script>

<style>
.header {
  margin-left: 0;
  margin-top: 0;
  width: 1200px;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  margin-bottom: 60px;
}
.filtre {
  background-color: #03f1a2; /* Green */
  border: none;
  border-radius: 6px;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  height: 30px;
  width: 160px;
}
.listCard {
  height: 80vh;
  overflow-y: scroll;
  padding-left: 50px;
  padding-right: 500px;
}
.separator {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
