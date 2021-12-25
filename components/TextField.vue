<template>
  <div>
    <v-text-field v-model="input"></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    get: {
      required: true,
    },
    fieldName: {
      required: true,
    },
    commit: {
      type: String,
      required: true,
    },
    stateName: {
      type: String,
      required: true,
    },
    number: {
      type: Boolean,
      required: false,
    },
  },
  computed: {
    input: {
      get() {
        return this.$props.get
      },
      set(newValue) {
        this.$store.commit(this.$props.commit, {
          payload: { [this.$props.fieldName]: newValue },
          stateName: this.$props.stateName,
        })
      },
    },
  },
}
</script>