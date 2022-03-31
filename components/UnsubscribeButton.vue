<template>
  <div>
    <v-btn
      class="ma-2"
      style="color: white"
      color="red"
      @click="$store.dispatch('lesson/unsubscribe', { lessonToUnsubscribe: lesson })"
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
  }
}
</script>
