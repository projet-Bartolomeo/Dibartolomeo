<template>
  <div class="page-container">
    <div class="align-center d-flex flex-column">
      <div style="width: 100%" class="px-16">
        <div>
          <Title value="Mes cours"> </Title>
        </div>
        <LessonFilter search-store="lesson.filter.search" start-date-store="lesson.filter.startDate"
          end-date-store="lesson.filter.endDate">
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
    <div v-else class="justify-center d-flex align-center" style="flex-grow: 1">
      <h1 class="text-list">Oups, aucun cours disponible</h1>
      <img class="logolessonList" src="/image/logo-grey.png" />
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
      studentId: this.$store.state.user.connected.id,
    })
  },
}
</script>

<style>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

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
  padding-left: 50px;
}

.separator {
  margin-top: 30px;
  margin-bottom: 30px;
}

.text-list {
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logolessonList {
  margin: 20;
  min-width: 70vw;
  width: 60vw;
  height: auto;
  position: absolute;
  z-index: 1;
  object-fit: fill;
}
</style>
