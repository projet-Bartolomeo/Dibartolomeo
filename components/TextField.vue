<template>
  <v-card
    v-click-outside="onClickOutside"
    class="
      d-flex
      justify-center
      align-center
      text-field-container
      auto-width
      card-size
    "
  >
    <div
      v-if="readonly"
      :class="`d-flex justify-center align-start ${titleStyle}`"
    >
      {{ input }}{{ $props.suffix }}
    </div>
    <v-text-field
      v-else
      :class="`flex-none text-field-padding ${titleStyle}`"
      v-model="input"
      :rules="$props.rules"
      :autofocus="true"
      :suffix="$props.suffix"
    ></v-text-field>
    <v-btn
      color="grey darken-2 auto-width"
      fab
      text
      @click="readonly = !readonly"
    >
      <v-icon> mdi-pencil </v-icon>
    </v-btn>
  </v-card>
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
    set: {
      type: String,
      required: false,
    },
    rules: {
      type: Array,
      required: false,
    },
    suffix: {
      type: String,
      required: false,
    },
    title: {
      type: Boolean,
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
    titleStyle() {
      return this.$props.title ? 'display-1' : ''
    },
  },
  methods: {
    onClickOutside() {
      this.readonly = true
    },
  },
}
</script>

<style>
.text-field-container {
  height: 40px;
  box-shadow: 1px 1px 1px 1px rgba(255, 255, 255, 0) !important;
  background-color: rgba(255, 255, 255, 0) !important;
}
.auto-width {
  width: auto !important;
}
.flex-none {
  flex: none !important;
}
.card-size {
  height: auto !important;
}
.text-field-padding {
  height: 56px !important;
  padding-top: 12.2px !important;
  margin-top: 0 !important;
}
</style>