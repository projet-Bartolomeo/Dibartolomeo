<template>
  <div id="page">
    <ModifEleve />
    <DataTableClasses />
      <v-row class="d-flex justify-center mb-6 align-center mt-5">
      <v-btn 
        id="enregistrer"
        elevation="7"
        color = success
        width="150px"
      >Enregistrer</v-btn>
      </v-row>
  </div>
</template>

<script lang="ts">
export default {
    components: {
  }
}
</script>

<style>
#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>