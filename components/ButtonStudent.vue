<template>
  <div>
    <v-btn
      class="ma-4"
      style="color: white"
      color="#76d9a3"
      @click="
        $store.commit('overlay/open', {
          component: 'MessageForm',
          props: { recipients: [user.id], type: 'student' },
          title: 'Tapez votre message',
        })
      "
      >Envoyer message</v-btn
    >
    <v-btn
      class="ma-4"
      color="error"
      width="200px"
      @click="
        $store.commit('overlay/open', {
          component: 'MessageForm',
        })
      "
    >
      Supprimer l'élève
    </v-btn>
  </div>
</template>
<script>
export default {}
</script>