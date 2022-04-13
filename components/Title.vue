<template>
  <v-row class="py-4 px-4">
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
