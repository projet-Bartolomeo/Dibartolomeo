<template>
  <!-- <Calendar userType="student" /> -->
  <div></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('lesson/setStudentList', {})
  },
}
</script>
