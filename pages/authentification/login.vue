<template>
  <div>
    <AuthBar />
  </div>
</template>
<script>
export default {
  layout: 'connexion_inscription',
  data() {
    return {
      snackbar: false,
      snackbarText: 'No error message',
      
    }
  },
}
</script>
