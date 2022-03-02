<template>
  <div>
    <Secondbar />
  </div>
</template>
<script>
export default {
  layout: 'connexion_inscription',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      },
    }
  },
}
</script>
