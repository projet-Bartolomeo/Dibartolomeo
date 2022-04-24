<template>
  <div>
    <div class="align-center d-flex flex-column">
      <div style="width: 100%" class="px-16">
        <div>
          <Title value="Mes cours"> </Title>
        </div>
        <LessonFilter search-store='lesson.filter.search'
          start-date-store='lesson.filter.startDate' end-date-store='lesson.filter.endDate'>
        </LessonFilter>
      </div>
    </div>

    <div v-if="$store.getters['lesson/studentListFiltered'].length != 0" class="listCard">
      <div v-for="lesson in $store.getters['lesson/studentListFiltered']" :key="lesson.id">
        <CardStudentLesson :lesson="lesson" />
        <div>
          <v-divider class="separator"></v-divider>
        </div>
      </div>
    </div>
    <div v-else class="justify-center d-flex align-center font" style="min-width: 100vh; min-height: 100vh">
      <h1>Oups, aucun cours disponible</h1>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
    }
  },
  created() {
    this.$store.dispatch('lesson/setStudentList', {
      studentId: this.$store.state.user.id,
    })
  },
}
</script>

<style>
.filtre {
  background-color: #03f1a2;
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
  padding-left: 50px;
}

.separator {
  margin-top: 30px;
  margin-bottom: 30px;
}

.font {
  background-image: url(/image/logo.png);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
