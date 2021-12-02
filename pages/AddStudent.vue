<template>
  <!-- <div id="fill-group"> -->
       <v-form >
  <v-row class="justify-space-between ma-5">
  
   
      <v-card elevation="6" width="1000px">
 
           <v-row class="justify-space-between ma-5">
        <v-col md="4">
          <v-text-field
            label="Nom"
             name='nom'
             id='nom'
            ref="user.Firstname"
          ></v-text-field>
          
          <v-text-field
            label="E-mail"
            type="mail"
             ref="user.email"
              
             name='email'
             id='email'
            required
          ></v-text-field> 
        </v-col>
                <v-col cols="12" md="4" justify-center >
          <v-text-field
            label="Prénom"
            required
            name='prenom'
             id='prenom'
          ></v-text-field>
          
        </v-col>
           </v-row>
      </v-card>
    <v-row class="d-flex justify-center mb-6 align-center mt-5">
      <v-btn @click="Addstudent">
      </v-btn>
      
      </v-row>
    
  </v-row>
      </v-form>
</template>
<script>
import  mailjs  from 'node-mailjet';
export default {

  data() {
    return {
      open: false,
      request:'',
      newUser: {
        firstName: '',
        lastName: '',
        email: '',
        type: 'student',
        banned: 'false',
      },
    };
  },
  created(){
   mailjs.connect(process.env.mailApiKey, process.env.mailSecretKey).post("send", {'version': 'v3.1'})
    .request({
        "Messages":[
    {
      "From": {
        "Email": "louka.ruiz@orange.fr",
        "Name": "Louia"
      },
      "To": [
        {
          "Email": "louka.ruiz@orange.fr",
          "Name": "Louia"
        }
      ],
      "Subject": "Greetings from Mailjet.",
      "TextPart": "My first Mailjet email",
      "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      "CustomID": "AppGettingStartedTest"
    }
  ]
})
  },


  methods:{
   async Addstudent() {
   this.newUser.Firstname = document.getElementById('nom').value;
      this.newUser.lastName = document.getElementById('prenom').value;
      this.newUser.email = document.getElementById('email').value;

await this.$store.dispatch('user/createUser', this.newUser);



  }
}
}
</script>
