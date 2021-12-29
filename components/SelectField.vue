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
    set: {
      type: String,
      required: false,
    },
  },
  computed: {
    state() {
      const state = this.$props.get.split('.')
      return {
        storeName: state[0],
        stateName: state[1],
        fieldName: state[2],
      }
    },
    commit() {
      return this.$props.set ?? `${this.state.storeName}/modify`
    },
    input: {
      get() {
        return this.$store.state[this.state.storeName][this.state.stateName][
          this.state.fieldName
        ]
      },
      set(newValue) {
        this.$store.commit(this.commit, {
          payload: { [this.state.fieldName]: newValue },
          stateName: this.state.stateName,
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