<template>
<div>
<Secondbar/>

</div>
</template>
<script>
export default {
    layout:'connexion_inscription',
  data() {
      
    return {
      snackbar: false,
      snackbarText: 'No error message',
      auth: {
        email: '',
        password: '',
      }
    }
  },
   methods: {
    login() {
      const that = this
      this.$fire.auth.signInWithEmailAndPassword(this.auth.email, this.auth.password)
      
      .catch(function (error){
        that.snackbarText = error.message
        that.snackbar = true
       
      }).then((user) => {
        
      })
    },
    googleSignIn(){
const that=this
    const provider= this.$fire.$firemodule.auth.GoogleAuthProvider()
    this.$fire.auth.signInWithPopup(provider)
    .catch(function (error){
        that.snackbarText = error.message
        that.snackbar = true
       
      }).then((user) => {
        
      })
    }
    
  }
  
}
</script>
