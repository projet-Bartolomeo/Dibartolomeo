<template>
  <div>
    <v-btn
      class="ma-2"
      style="color: white"
      color="red"
      @click="
        $store.commit('overlay/open', {
          component: 'LessonModificationForm',
          props: {
            lesson: $props.lesson,
            modify: true,
            payload,
            student: studentToRemove,
          },
          title: $props.lesson.recurrenceId
            ? 'Voulez-vous vous désinscrire :'
            : '',
        })
      "
    >
      SE DESINSCRIRE
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    lesson: {
      required: false,
      type: Object,
      default: undefined
    }
  },
  computed: {
    studentToRemove() {
      return this.$store.state.user.connected
    },
    payload() {
      const studentIds = [ ...this.$props.lesson.studentIds].filter(
        (id) => id !== this.studentToRemove.id
      )
      const payload = { studentIds }
      return payload
    }
  }
}
</script>
