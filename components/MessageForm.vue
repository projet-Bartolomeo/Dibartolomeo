<template>
  <v-col class="d-flex flex-column align-center">
    <v-textarea
      clearable
      v-model="message"
      class="text-area"
      filled
      auto-grow
      name="input-7-4"
      label="Entrez votre message ici"
      style="width: 30vw"
    ></v-textarea>
    <v-btn
      :disabled="message.trim() === ''"
      @click="sendMessage"
      style="color: white"
      color="teal lighten-2"
      >Envoyer</v-btn
    >
  </v-col>
</template>

<script>
export default {
  props: {
    recipients: {
      type: Array,
      required: true,
    },
    type: {
      defaultValue: 'user',
      type: String,
      required: true,
    },
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    sendMessage() {
      this.$store.commit('overlay/close')
      this.$store.commit('notification/open', { description: `mesage send to students` })
      this.message = ''
    },
  },
}
</script>
