<template>
  <div>
    <v-dialog v-model="overlay" class="auto-width" max-width="55vw">
      <v-card>
        <v-card-actions class="pa-4">
          <div
            v-if="$store.state.overlay.title !== ''"
            class="d-flex justify-center align-center"
            v-html="$store.state.overlay.title"
          >
          </div>
          <v-spacer></v-spacer>
          <v-btn
            min-height="auto"
            min-width="auto"
            height="40px"
            width="40px"
            color="grey darken-2"
            text
            @click="$store.commit('overlay/close')"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container style="min-height: unset" class="pt-0">
          <component
            :is="$store.state.overlay.component"
            v-if="$store.state.overlay.component !== ''"
            v-bind="$store.state.overlay.props"
          ></component>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  computed: {
    overlay: {
      get() {
        return this.$store.state.overlay.open
      },
      set() {
        this.$store.commit('overlay/close')
      },
    },
  },
}
</script>

<style>
.v-dialog {
  width: auto !important;
}
</style>