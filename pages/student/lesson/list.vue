<template>
  <div>
    <Title value="Mes cours enregistrés">
      <v-btn color="#41c6a9" class="white--text" elevation="2"
        >Filtrer<v-icon right> mdi-filter-variant </v-icon></v-btn
      >
    </Title>
    <div class="listCard">
      <div v-for="lesson in $store.state.lesson.studentList" :key="lesson.id">
        <div v-if="lesson.studentIds.includes($store.state.user.id)">
          <CardStudentLesson :lesson="lesson" />
          <div>
            <v-divider class="separator"></v-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('lesson/setStudentList', {
      studentId: this.$store.state.user.id,
    })
  },
}
</script>

<style>
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
}
.separator {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
