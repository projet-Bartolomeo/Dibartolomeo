<template>
  <Calendar userType="professor" />
</template>

<script>

export default {
  async created() {
    await this.$store.dispatch('lesson/setTeacherList', {})
  },
}
</script>
