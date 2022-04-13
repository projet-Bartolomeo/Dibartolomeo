<template>
  <div>
    <div>
      <h1 style="margin-bottom: 3vh; margin-left: 1vw">Ajouter un cours</h1>
      <v-card elevation="6" width="45vw" height="7.6vh">
        <div id="cont1">
          <TextField
              :get="`lesson.${$props.datas}.title`"
              :rules="[(v) => !!v || 'Le titre est obligatoire']"
              title
              :open="open"
              placeholder="Entrez le titre"
            />
          <TextField
              :suffix="$props.datas === 'new' ? '' : 'élèves'"
              :get="`lesson.${$props.datas}.maximumStudents`"
              :rules="[
                (v) => !!v || 'Le nombre maximum d\'élèves est obligatoire',
                (v) =>
                  !isNaN(Number(v)) ||
                  'Le nombre maximum d\'élèves doit etre un nombre',
              ]"
              number
              :open="open"
              placeholder="Entrez le nb max d'élèves"
            />
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { Recurrence } from '../enums/Recurrence'
export default {
  props: {
    datas: {
      type: String,
      required: true,
    },
  },
  computed: {
    lesson() {
      return this.$store.state.lesson[this.$props.datas]
    },
    valid: {
      get() {
        return this.$store.state.lesson.form.valid
      },
      set(newValue) {
        this.$store.commit('lesson/modify', {
          stateName: 'form',
          payload: { valid: newValue },
        })
      },
    },
    recurrence() {
      if (this.$store.state.lesson[this.$props.datas] === undefined) return ''
      const recurrence = this.$store.state.lesson[this.$props.datas].recurrence
      return Recurrence[recurrence]
    },
    hasModifications() {
      if (this.$store.state.lesson.form.payload === undefined) return false
      return Object.keys(this.$store.state.lesson.form.payload).length > 0
    },
    open() {
      return this.$props.datas === 'new'
    },
  },
  methods: {
    create() {
      this.$store.dispatch('lesson/create', this.$store.state.lesson.new)
      this.$router.push('/lesson/list')
    },
  },
}
</script>
<style scoped>
#cont1 {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
}
</style>