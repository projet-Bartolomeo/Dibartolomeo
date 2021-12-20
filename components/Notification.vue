<template>
  <div class="text-center">
    <v-snackbar class="mb-8" :timeout="4000" v-model="open" :color="type.color">
      <div class="d-flex">
        <v-icon class="mr-4">{{ `mdi-${type.icon}` }}</v-icon>
        <div class="d-flex align-center mt-1">
          {{ $store.state.notification.description }}
        </div>
        <v-spacer></v-spacer>
        <v-icon v-bind="attrs" @click="$store.commit('notification/close')"
          >mdi-close</v-icon
        >
      </div>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  computed: {
    open: {
      get() {
        return this.$store.state.notification.open
      },
      set() {
        this.$store.commit('notification/close')
      },
    },
    type() {
      return this.$store.state.notification.type === 'success'
        ? { color: 'teal lighten-2', icon: 'check' }
        : { color: 'red', icon: 'alert' }
    },
  },
}
</script>
