<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row class="d-flex justify-space-between">
      <v-col class="d-flex align-center" cols="12" sm="6" md="3">
        <v-text-field
          v-model="student.firstName"
          :rules="[(v) => !!v || 'Le nom est obligatoire']"
          label="Prénom"
          required
          filled
          hide-details
        ></v-text-field>
      </v-col>
      <v-col class="d-flex align-center" cols="12" sm="6" md="3">
        <v-text-field
          v-model="student.lastName"
          :rules="[(v) => !!v || 'Le nom est obligatoire']"
          label="Nom"
          required
          filled
          hide-details
        ></v-text-field> </v-col
      ><v-col class="d-flex align-center" cols="14" sm="6" md="3">
        <v-select
          v-model="student.level"
          :items="[
            { text: 'Débutant', value: 'beginner' },
            { text: 'Intermédiaire', value: 'intermediate' },
            { text: 'Élevé ', value: 'high' },
          ]"
          filled
          label="Niveau"
          hide-details
        ></v-select>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="12" sm="6" md="3">
        <div v-if="$props.type == 'new'">
          <v-icon
            :disabled="!valid"
            class="mr-4"
            @click="create"
            color="#7dd5a5"
          >
            mdi-content-save
          </v-icon>
        </div>
        <div v-if="$props.type == 'participant'">
          <v-icon
            :disabled="!valid"
            class="mr-4"
            @click="modify"
            color="#7dd5a5"
          >
            mdi-content-save
          </v-icon>
          <v-icon
            class="mr-1"
            @click="
              $store.dispatch('student/removeFromTeacher', {
                student: $props.datas,
              }),
                fetchData()
            "
          >
            mdi-delete
          </v-icon>
        </div>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    student: {},
  }),
  props: {
    datas: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    idStudent: {
      type: String,
      required: true,
    },
  },

  created() {
    this.student = { ...this.$props.datas }
  },

  watch: {
    async student() {
      if (this.$props.type === 'participant') {
        await this.$store.commit(`student/modifyList`, {
          stateName: this.$props.type,
          studentId: this.student.id,
          payload: this.student,
        })
      }
      if (this.$props.type === 'new') {
        await this.$store.commit(`student/modify`, {
          stateName: this.$props.type,
          payload: this.student,
        })
      }
    },
  },

  methods: {
    reset() {
      this.$refs.form.reset()
    },
    async modify() {
      if (this.$refs.form.validate()) {
        await this.$store.dispatch('student/modify', {
          studentId: this.$props.datas.id,
          payload: this.student,
        })
      }
    },
    create() {
      if (this.$refs.form.validate()) {
        if (this.$store.state.student.details.phone) {
          this.$store.state.student.new.phone =
            this.$store.state.student.details.phone
        }
        this.$store.state.student.new.email =
          this.$store.state.student.details.email
        this.$store.state.student.new.isPrincipal = false
        this.$store.state.student.new.idUserPrincipal = this.$props.idStudent
        this.$store.dispatch(
          'student/createFromTeacher',
          this.$store.state.student.new
        )
        this.fetchData()
        this.$store.dispatch('student/setNew')
        this.reset()
      }
    },

    async fetchData() {
      this.participant = await this.$store.dispatch(
        'student/setParticipant',
        this.$props.idStudent
      )
    },
  },
}
</script>