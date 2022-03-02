<template>
  <v-row class="ma-4 justify-space-between">
    <h1>{{ $props.value }}</h1>
    <slot></slot>
  </v-row>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
  },
}
</script>
