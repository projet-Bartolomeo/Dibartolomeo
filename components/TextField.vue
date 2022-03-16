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
      :class="`d-inline-block text-truncate d-flex justify-center align-start ${titleStyle}`"
    >
      {{ input }}{{ $props.suffix }}
    </div>
    <v-text-field
      v-else
      v-model="input"
      :class="`flex-none text-field-padding ${titleStyle}`"
      :rules="$props.rules"
      :autofocus="!$props.open"
      :suffix="$props.suffix"
      :placeholder="$props.placeholder"
      filled
    ></v-text-field>
    <v-btn color="grey darken-2 auto-width" fab text @click="changeState">
      <v-icon> mdi-pencil </v-icon>
    </v-btn>
  </v-card>
</template>

<script>
import { tryConvertStringToNumber } from '../services/numberHelper'
export default {
  props: {
    get: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      required: false,
      default: () => [],
    },
    suffix: {
      type: String,
      required: false,
      default: '',
    },
    title: {
      type: Boolean,
      required: false,
    },
    number: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    open: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      readonly: !this.$props.open,
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
        if (this.$props.number) newValue = tryConvertStringToNumber(newValue)
        this.$store.dispatch('setFormField', {
          stateInformations: this.state,
          newValue,
        })
      },
    },
    titleStyle() {
      return this.$props.title ? 'display-1' : ''
    },
  },
  methods: {
    onClickOutside() {
      if (!this.$props.open) {
        this.readonly = this.$store.state[this.state.storeName].form.valid
          ? true
          : this.readonly
      }
    },
    changeState() {
      if (!this.$props.open) {
        this.readonly = this.$store.state[this.state.storeName].form.valid
          ? !this.readonly
          : this.readonly
      }
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