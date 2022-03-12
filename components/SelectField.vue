<template>
  <v-select
    v-model="input"
    class="pa-0 ma-0 pt-2"
    :items="$props.items"
  ></v-select>
</template>

<script>
export default {
  props: {
    get: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      readonly: true,
    }
  },
  computed: {
    state() {
      return this.$store.getters.getStateFromString(this.$props.get)
    },
    input: {
      get() {
        return this.state.value
      },
      set(newValue) {
        this.$store.dispatch('setFormField', {
          stateInformations: this.state,
          newValue,
        })
      },
    },
  },
  created() {
    this.select = this.$props.items[0]
  },
  methods: {
    onClickOutside() {
      this.readonly = true
    },
  },
}
</script>