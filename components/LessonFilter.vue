<template>
  <v-card class="ma-4 mb-6">
    <v-card-title>
      <IntervalDateFilter :getend="$props.endDateStore" :getstart="$props.startDateStore" />
      <TextField class='text-field-search' :get="$props.searchStore" :open="true" placeholder="Rechercher un cours" />
      <v-spacer></v-spacer>
      <slot></slot>
    </v-card-title>
  </v-card>
</template>

<script>

export default {
  props: {
    startDateStore: {
      type: String,
      required: true,
    },
    endDateStore: {
      type: String,
      required: true,
    },
    searchStore: {
      type: String,
      required: true
    }
  },
}
</script>

<style>
  .text-field-search {
    margin-bottom: 6px;
  }
</style>
