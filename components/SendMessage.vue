<style>
#page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 600px;
}
.send-button {
  width: 50%;
}
</style>
<template>
  <div ma-16>
  <v-container fluid d-flex
      justify-center style="width: 40vw" >
    <v-row id=page>
      <p> Envoyer un Message </p>
      <v-col
        cols="9"
        md="6"
        class="d-flex flex-column align-center"
      >
        <v-textarea
          filled
          auto-grow
          name="input-7-4"
          label="Entrez votre message ici"
          style="width: 60vw"
        ></v-textarea>
    <v-btn
      id="message-vide"
      elevation="7"
      color = green
      class="send-button"
    >Envoyer</v-btn>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>

<script>
export default({
/*   methods: {
    say: function (message) {
      alert(message)
    }
  } */
})
</script>