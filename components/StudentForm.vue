<template>
  <v-form v-model="valid" class="d-flex justify-space-around">
    <v-card elevation="6" width="60vw" class="ma-auto pa-1">
      <v-row class="ma-5">
        <v-col md="6">
          <v-row class="align-center justify-start">
            <p class="ma-0 mr-2">Nom de famille :</p>
            <TextField
              :open="open"
              :get="`student.${$props.datas}.lastName`"
              :rules="[(v) => !!v || 'Le nom est obligatoire']"
            />
          </v-row>
        </v-col>
        <v-col md="6">
          <v-row class="align-center justify-start">
            <p class="ma-0 mr-2">Prénom :</p>
            <TextField
              :open="open"
              :get="`student.${$props.datas}.firstName`"
              :rules="[(v) => !!v || 'Le prénom est obligatoire']"
            />
          </v-row>
        </v-col>

        <v-col md="6">
          <v-row class="align-center justify-start">
            <p class="ma-0 mr-2">Email :</p>
            <TextField
              :disabled="
                $store.state.user.connected.type === 'professor' &&
                $props.datas !== 'new'
                  ? true
                  : false
              "
              :open="open"
              :get="`student.${$props.datas}.email`"
              :rules="[
                (v) => !!v || 'Le mail est obligatoire',
                (v) => /.+@.+\..+/.test(v) || 'Le mail n\'est pas valide',
              ]"
            />
          </v-row>
        </v-col>
        <v-col md="6">
          <v-row class="align-center justify-start">
            <p class="ma-0 mr-2">Niveau :</p>
            <SelectField
              :get="`student.${$props.datas}.level`"
              :items="[
                { text: 'Débutant', value: 'beginner' },
                { text: 'Intermédiaire', value: 'intermediate' },
                { text: 'Élevé ', value: 'high' },
              ]"
              :open="open"
            />
          </v-row>
        </v-col>
        <v-col md="6">
          <v-row class="align-center justify-start">
            <p class="ma-0 mr-2">Téléphone :</p>
            <TextField :open="open" :get="`student.${$props.datas}.phone`" />
          </v-row>
        </v-col>

        <v-col md="6" class="d-flex">
          <v-row class="align-center justify-center">
            <div
              v-if="$props.datas == 'details'"
              class="d-flex flex-column justify-center align-center"
            >
              <v-btn
                v-if="$store.state.user.connected.type == 'student'"
                color="#fa3257"
                style="color: white"
                @click="
                  $store.commit('overlay/open', {
                    component: 'ResetPassword',
                    title: 'Taper votre nouveau mot de passe',
                  })
                "
              >
                Changer le mot de passe
              </v-btn>
            </div>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <div
      v-if="$props.datas == 'details'"
      class="d-flex flex-column justify-center align-center"
    >
      <v-btn
        v-if="$props.redirect == '/professor/student/list'"
        color="#53b3e6"
        style="color: white; width: 12vw"
        @click="
          $store.commit('overlay/open', {
            component: 'MessageForm',
            props: {
              recipients: [$store.state.student.details],
              type: 'student',
            },
            title: 'Tapez votre message',
          })
        "
        >Message
        <v-icon class="ml-2"> mdi-message </v-icon>
      </v-btn>
      <v-btn
        v-if="valid && hasModifications"
        color="#76d9a3"
        class="ma-2"
        style="color: white; width: 12vw"
        @click="validate()"
      >
        Enregistrer
        <v-icon class="ml-2"> mdi-content-save </v-icon>
      </v-btn>
      <v-btn
        v-if="hasModifications"
        color="#f4f4f4;"
        style="width: 12vw"
        class="ma-2"
        @click="
          $store.dispatch('resetEditionForm', {
            storeName: 'student',
            stateName: $props.datas,
          })
        "
      >
        Rétablir
        <v-icon class="ml-2"> mdi-arrow-u-down-left </v-icon>
      </v-btn>
      <v-btn
        v-if="$props.redirect == '/professor/student/list'"
        color="#fa3257"
        class="ma-2"
        style="color: white; width: 12vw"
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
        >Suprrimer
        <v-icon class="ml-2"> mdi-delete </v-icon>
      </v-btn>
    </div>
    <div v-if="$props.datas == 'new'" class="d-flex flex-column justify-center">
      <v-btn
        v-if="valid && hasModifications"
        color="#76d9a3"
        class="ma-2"
        style="color: white; width: 12vw"
        @click="create()"
      >
        Enregistrer
        <v-icon class="ml-2"> mdi-content-save </v-icon>
      </v-btn>
      <v-btn
        v-if="hasModifications"
        color="#f4f4f4;"
        style="width: 12vw"
        class="ma-2"
        @click="
          $store.dispatch('resetEditionForm', {
            storeName: 'student',
            stateName: $props.datas,
          })
        "
      >
        Rétablir
        <v-icon class="ml-2"> mdi-arrow-u-down-left </v-icon>
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import { generateRandomId } from '../services/firestoreHelper'

export default {
  props: {
    datas: {
      type: String,
      required: true,
    },
    idstudent: {
      type: String,
      required: false,
    },
    redirect: {
      type: String,
      required: false,
    },
  },
  computed: {
    student() {
      return this.$store.state.student[this.$props.datas]
    },
    password() {
      return generateRandomId()
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
    async create() {
      if (this.valid) {
        await this.$store.dispatch('student/createFromTeacher', {
          student: this.$store.state.student.new,
          password: this.password,
        })
        await this.$store.dispatch('user/forgotPassword', {
          email: this.$store.state.student.new.email,
        })

        this.$router.push('/professor/student/list')
      }
    },
    async validate() {
      if (this.valid) {
        await this.$store.dispatch('student/modify', {
          studentId: this.$props.idstudent,
          payload: this.$store.state.student.details,
        })

        this.$router.push(this.$props.redirect)
      }
    },
  },
}
</script>