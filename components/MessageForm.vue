<template>
  <v-col class="d-flex flex-column align-center">
    <v-textarea
      v-model="message"
      clearable
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
      style="color: white"
      color="teal lighten-2"
      @click="sendMessage"
      >Envoyer</v-btn
    >
  </v-col>
</template>

<script>
import { createMessageDescription } from '../services/messageHelper'
export default {
  props: {
    recipients: {
      type: Array,
      required: true,
    },
    type: {
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
      const description = createMessageDescription(
        this.$props.type,
        this.$props.recipients
      )
      this.$store.commit('overlay/close')
      this.$store.dispatch('message/send', {
        type: this.$props.type,
        recipients: this.$props.recipients,
        description,
        contentMessage: this.message,
      })
      this.message = ''
    },
  },
}
</script>
