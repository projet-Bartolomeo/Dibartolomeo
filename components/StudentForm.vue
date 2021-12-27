<template>
  <v-card elevation="6" width="55vw" class="ma-auto">
    <v-row class="justify-space-between ma-5">
      <v-col md="5">
        <TextField
          :get="student.lastName"
          fieldName="lastName"
          commit="student/modify"
          :stateName="$props.datas"
          label="Nom"
          :rules="[(v) => !!v || 'Le nom est obligatoire']"
        />
        <TextField
          :get="student.email"
          fieldName="email"
          commit="student/modify"
          :stateName="$props.datas"
          label="Mail"
          :rules="emailRules"
        />
      </v-col>
      <v-col cols="12" md="4">
        <TextField
          :get="student.firstName"
          fieldName="firstName"
          commit="student/modify"
          :stateName="$props.datas"
          label="Prénom"
          :rules="[(v) => !!v || 'Le prénom est obligatoire']"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    datas: {
      type : String,
      required: true,
    },
  },
  data() {
    return {
      valid: true,
      emailRules: [
        (v) => !!v || 'Le mail est obligatoire',
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas valide",
      ],
    }
  },
  computed: {
    student() {
      return this.$store.state.student[this.$props.datas]
    },
  },
}
</script>