<template>
  <div
    v-click-outside="onClickOutside"
    class="
      d-flex
      justify-center
      align-center
      text-field-container
      auto-width
      card-size
      pa-4
    "
  >
    <div
      v-if="readonly"
      class="
        textarea-size
        d-flex
        justify-start
        align-start
        pa-3
        textarea-text-color
      "
    >
      {{ input }}
    </div>
    <v-textarea
      v-else
      v-model="input"
      height="100%"
      min-height="100%"
      class="textarea-size"
      :rules="$props.rules"
      :autofocus="!this.$props.open"
      :placeholder="$props.placeholder"
      auto-grow
      filled
    ></v-textarea>
    <div class="d-flex align-end textarea-readonly">
      <v-btn class="ma-2" color="grey darken-2" fab text @click="changeState">
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      readonly: !this.$props.open,
    }
  },
  props: {
    get: {
      type: String,
      required: true,
    },
    rules: {
      type: Array,
      required: false,
    },
    open: {
      type: Boolean,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
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
          newValue
        })
      },
    },
  },
  methods: {
    onClickOutside() {
      this.readonly = this.$store.state[this.state.storeName].form.valid ? true : this.readonly
    },
    changeState() {
      this.readonly = this.$store.state[this.state.storeName].form.valid ? !this.readonly : this.readonly
    }
  },
}
</script>

<style>
.textarea-size {
  height: 20vh;
  min-height: 200px;
  width: 100%;
}
.textarea-readonly {
  position: absolute;
  right: 0;
  bottom: 0;
}
.textarea-text-color {
  color: rgb(87, 87, 87);
}
.text-field-container {
  position: relative;
}
</style>