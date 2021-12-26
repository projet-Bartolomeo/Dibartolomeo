<template>
  <v-card elevation="6" width="55vw" class="ma-auto">
    <v-row class="justify-space-between ma-5">
      <v-col md="4">
        <TextField
          :get="$store.state.student.new.lastname"
          fieldName="lastName"
          commit="student/modify"
          stateName="new"
          label="Nom"
          :rules="[(v) => !!v || 'Le nom est obligatoire']"
        />
        <TextField
          :get="$store.state.student.new.email"
          fieldName="email"
          commit="student/modify"
          stateName="new"
          label="Mail"
          :rules="emailRules"
        />
      </v-col>
      <v-col cols="12" md="4">
        <TextField
          :get="$store.state.student.new.lastname"
          fieldName="firstName"
          commit="student/modify"
          stateName="new"
          label="Prénom"
          :rules="[(v) => !!v || 'Le prénom est obligatoire']"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        lastname: '',
        email: '',
        firstname: '',
      },
      valid: true,
      emailRules: [
        (v) => !!v || "Le mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "Le mail n'est pas valide",
      ],
    }
  },
}
</script>