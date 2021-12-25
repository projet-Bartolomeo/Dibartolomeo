<template>
  <div><v-text-field v-model="title"></v-text-field></div>
</template>

<script>
export default {
  computed: {
    title: {
      get() {
        return this.$store.state.lesson.details.title
      },
      set(title) {
        this.$store.commit('lesson/modify', {
          payload: { title },
          stateName: 'details',
        })
      },
    },
  },
}
</script>
