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
    "
  >
    <div
      v-if="readonly"
      class="textarea-size d-flex justify-center align-center textarea-size"
    >
      {{ input }}
    </div>
    <v-textarea
      v-else
      :rules="$props.rules"
      :autofocus="true"
      v-model="input"
      class="textarea-size"
      auto-grow
      filled
    ></v-textarea>
    <div class="d-flex align-end textarea-readonly">
      <v-btn
        color="grey darken-2 auto-width ma-2"
        fab
        text
        @click="readonly = !readonly"
      >
        <v-icon> mdi-pencil </v-icon>
      </v-btn>
    </div>
  </div>
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
      require: false,
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
}
</script>

<style>
.textarea-size {
  height: 20vh;
  min-height: 200px;
}
.textarea-readonly {
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>