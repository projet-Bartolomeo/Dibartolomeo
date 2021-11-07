<template>
  <div ma-16>
    <v-container fluid d-flex justify-center style="width: 40vw">
      <v-col class="d-flex flex-column align-center">
        <p class="mb-10">Envoyer un Message</p>
        <v-textarea
          filled
          auto-grow
          name="input-7-4"
          label="Entrez votre message ici"
          style="width: 60vw"
        ></v-textarea>
        <v-btn id="message-vide" elevation="7" color="green">Envoyer</v-btn>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>