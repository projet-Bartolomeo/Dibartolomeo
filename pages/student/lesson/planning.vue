<template>
  <Calendar userType="student" />
</template>

<script>
export default {
  created() {
    this.$store.dispatch('lesson/setStudentList', {})
  },
}
</script>
