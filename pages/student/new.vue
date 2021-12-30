<template>
  <div>
    <Title value="Création d'un élève" />
    <v-col class="justify-center">
      <v-form ref="form" v-model="valid" lazy-validation>
        <StudentForm datas="new" class="mt-10" />
      </v-form>
    </v-col>
  </div>
</template>

<script>
export default {}
</script>
