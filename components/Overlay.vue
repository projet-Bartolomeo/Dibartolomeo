<template>
  <div>
    <v-icon v-if="type === 'icon'" small @click="dialog = !dialog">
      {{ buttonTitle }}
    </v-icon>
    <v-btn
      v-else
      disabled
      style="color: white"
      color="teal lighten-2"
      @click="dialog = !dialog"
    ></v-btn>
    <v-dialog v-model="dialog" max-width="55vw">
      <v-card>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container class="pt-0">
          <v-col class="d-flex flex-column align-center">
            <p class="mb-10">Envoyer un Message</p>
            <slot></slot>
            <v-btn id="message-vide" elevation="7" color="green">Envoyer</v-btn>
          </v-col>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      default: 'icon',
      type: String,
      required: false,
    },
    buttonTitle: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
