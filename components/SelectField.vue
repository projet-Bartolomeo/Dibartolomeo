<template>
  <v-select
    class="pa-0 ma-0 pt-2"
    v-model="input"
    :items="$props.items"
  ></v-select>
</template>

<script>
export default {
  data() {
    return {
      readonly: true,
    }
  },
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
  methods: {
    onClickOutside() {
      this.readonly = true
    },
  },
  created() {
    this.select = this.$props.items[0]
  },
}
</script>