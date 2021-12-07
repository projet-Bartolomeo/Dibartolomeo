<template>
  <div class="auto-width">
    <v-icon v-if="type === 'icon'" @click="dialog = !dialog">
      {{ buttonTitle }}
    </v-icon>
    <v-btn
      v-else
      style="color: white"
      color="teal lighten-2"
      @click="dialog = !dialog"
      >{{ buttonTitle }}</v-btn
    >
    <v-dialog v-model="dialog" max-width="55vw">
      <v-card>
        <v-card-actions class="pa-4">
          <div class="d-flex justify-center align-center">
           {{ overlayTitle }}
          </div>
          <v-spacer></v-spacer>
          <v-btn
            min-height="auto"
            min-width="auto"
            height="40px"
            width="40px"
            text
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container class="pt-0">
          <slot></slot>
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
    overlayTitle: {
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

<style lang="css" scoped>
  .auto-width {
    width: auto
  }
</style>