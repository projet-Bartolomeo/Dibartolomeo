<template>
  <v-form v-model="valid" class="d-flex justify-space-around">
    <v-card elevation="6" width="60vw" class="ma-auto pa-1">
      <v-row class="justify-center ma-5">
        <v-col md="6">
          <v-row class="align-center justify-center">
            <p class="ma-0 mr-2">Nom de famille :</p>
            <TextField
              :open="open"
              :get="`student.${$props.datas}.lastName`"
              :rules="[(v) => !!v || 'Le nom est obligatoire']"
            />
          </v-row>
        </v-col>
        <v-col md="6">
          <v-row class="align-center justify-center">
            <p class="ma-0 mr-2">Prénom :</p>
            <TextField
              :open="open"
              :get="`student.${$props.datas}.firstName`"
              :rules="[(v) => !!v || 'Le prénom est obligatoire']"
            />
          </v-row>
        </v-col>

        <v-col md="7">
          <v-row class="align-center justify-center">
            <p class="ma-0 mr-2">Email :</p>
            <TextField
              :open="open"
              :get="`student.${$props.datas}.email`"
              :rules="[
                (v) => !!v || 'Le mail est obligatoire',
                (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
              ]"
            />
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <div
      v-if="$props.datas == 'details'"
      class="d-flex flex-column justify-center"
    >
      <v-btn
        v-if="valid && hasModifications"
        class="ma-2"
        color="success"
        @click="validate()"
        >Enregistrer</v-btn
      >
      <v-btn
        class="ma-2"
        color="error"
        @click="
          $store.commit('overlay/open', {
            component: 'DeleteForm',
            props: {
              type: student,
              dataToDelete: $store.state.student.details,
            },
            title: '',
          })
        "
        >Supprimer</v-btn
      >
    </div>
    <div v-if="$props.datas == 'new'" class="d-flex flex-column justify-center">
      <v-btn v-if="valid" class="ma-2" color="success" @click="create()"
        >Enregistrer</v-btn
      >
    </div>
  </v-form>
</template>

<script>
export default {
  props: {
    datas: {
      type: String,
      required: true,
    },
  },
  computed: {
    student() {
      return this.$store.state.student[this.$props.datas]
    },
    valid: {
      get() {
        return this.$store.state.student.form.valid
      },
      set(newValue) {
        this.$store.commit('student/modify', {
          stateName: 'form',
          payload: { valid: newValue },
        })
      },
    },
    hasModifications() {
      if (this.$store.state.student.form.payload === undefined) return false
      return Object.keys(this.$store.state.student.form.payload).length > 0
    },
    open() {
      return this.$props.datas === 'new'
    },
  },
  methods: {
    create() {
      if (this.valid) {
        this.$store.dispatch(
          'student/createFromTeacher',
          this.$store.state.student.new
        )
        this.$router.push('/student/list')
      }
    },
    async validate() {
      if (this.valid) {
        await this.$store.dispatch('student/modify', {
          studentId: this.$route.query.id,
          payload: this.$store.state.student.details,
        })

        this.$router.push('/student/list')
      }
    },
  },
}
</script>