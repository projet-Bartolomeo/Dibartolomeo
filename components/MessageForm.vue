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
      :disabled="
        message == undefined || (message != undefined && message.trim() === '')
      "
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
      let description = ''
      if (this.$props.type === 'student') {
        description =
          this.$props.recipients.length === 1
            ? 'message envoyé à l\'élève'
            : 'message envoyé à vos élèves'
      } else {
        description =
          this.$props.recipients.length === 1
            ? 'message envoyé aux élèves de votre cours'
            : 'message envoyé aux élèves de vos cours'
      }

      this.$store.commit('overlay/close')
      this.$store.commit('notification/open', {
        description,
      })
      this.message = ''
    },
  },
}
</script>
