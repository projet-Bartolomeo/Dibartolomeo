<template>

<div>
  <password
    v-model="password"
    :toggle="true"
    @score="showScore"
    @feedback="showFeedback"
  />
<v-btn></v-btn>
<LessonModificationForm/>
</div>
</template>
 
<script>
  import Password from 'vue-password-strength-meter'
  export default {
    components: { Password },
    data: () => ({
      password: null
    }),
    methods: {
      showFeedback ({suggestions, warning}) {
        console.log('🙏', suggestions)
        console.log('⚠', warning)
      },
      showScore (score) {
        console.log('💯', score)
      },
      initlogin(){
         this.$fire.auth.createUserWithEmailAndPassword(
        this.auth.email,
        this.auth.password
      )

      }
    }
  }
</script>