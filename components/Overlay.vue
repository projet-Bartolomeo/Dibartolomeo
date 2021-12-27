<template>
  <div>
    <v-dialog class="auto-width" v-model="overlay" max-width="55vw">
      <v-card>
        <v-card-actions class="pa-4">
          <div
            v-if="$store.state.overlay.title !== ''"
            class="d-flex justify-center align-center"
          >
            {{ $store.state.overlay.title }}
          </div>
          <v-spacer></v-spacer>
          <v-btn
            @click="$store.commit('overlay/close')"
            min-height="auto"
            min-width="auto"
            height="40px"
            width="40px"
            text
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-actions>
        <v-container class="pt-0">
          <component
            v-if="$store.state.overlay.component !== ''"
            v-bind="$store.state.overlay.props"
            v-bind:is="$store.state.overlay.component"
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