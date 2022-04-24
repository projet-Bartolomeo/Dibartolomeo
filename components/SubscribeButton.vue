<template>
  <div>
    <v-btn
      class="ma-2"
      style="color: white"
      color="#76d9a3"
      @click="
        $store.commit('overlay/open', {
          component: 'LessonModificationForm',
          props: {
            lesson: $props.lesson,
            modify: true,
            payload: getPayload(),
            student,
          },
          title: $props.lesson.recurrenceId
            ? 'Voulez-vous rejoindre :'
            : '',
        })
      "
    >
      S'INSCRIRE
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
    student() {
      return this.$store.state.user.connected
    }
  },
  methods: {
    getPayload() {
      const studentIds = [ ...this.$props.lesson.studentIds, this.student.id ]
      const payload = { studentIds }
      return payload
    }
  }
}
</script>
