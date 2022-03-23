<template>
  <div class="ma-0 d-flex justify-center">
    <v-card>
      <h3 class="pt-3 ma-10" style="border-bottom: solid 1px">
        Les participants additionel
      </h3>
      <div
        v-for="(participant, index) in $store.state.student.participant"
        :key="index"
      >
        <div class="d-flex flex-column ma-10">
          <p>Participant {{ index + 1 }}</p>
          <div>
            <ParticipantForm
              :datas="$store.state.student.participant[index]"
              type="participant"
              :idstudent="$props.idstudent"
            />
          </div>
        </div>
      </div>
      <div v-if="isActive" class="ma-10">
        <ParticipantForm
          :datas="$store.state.student.new"
          type="new"
          :idstudent="$props.idstudent"
        />
      </div>
      <div class="d-flex pl-10 pb-5">
        <v-icon
          v-if="!isActive"
          class="mr-4"
          color="black"
          :class="{ active: isActive }"
          @click="isActive = !isActive"
          >> mdi-plus-circle-outline
        </v-icon>
        <v-icon
          v-else
          class="mr-4"
          color="black"
          :class="{ active: isActive }"
          @click="isActive = !isActive"
        >
          mdi-minus-circle-outline
        </v-icon>
        <p class="ma-0" color="black">Ajouter un participant</p>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    idstudent: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
    created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      this.participant = await this.$store.dispatch(
        'student/setParticipant',
        this.$props.idstudent
      )
    },
  },
}
</script>
