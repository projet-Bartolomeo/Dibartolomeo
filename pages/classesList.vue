<template>
    <div>
      <div id="flex">
        <div id="title"><h1>Listes des cours</h1></div>
        <div id="btnAjouterCours">
           <router-link to="/formCrea"> <boutton class="btnCours" type="button">Ajouter un cours</boutton></router-link>
            
        </div>
      </div>
      <div id="sendMail">
        <button @click="open = !open"  class="btnMail" type="button">Nouveau message</button>
      </div>
    <v-overlay :value="open">
      <div class="d-flex justify-end">
        <button @click="open = !open" class="popup-close">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <send-message />
    </v-overlay>
      <div id="table">
        <DataTableClasses/>
      </div>
    </div>
</template>

<script>
export default {
    data() {
    return {
      open: false,
    }
  },
}
</script>

<style>
#flex{
  padding-top: 3em;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

#flex :first-child{
  align-self: end;
}

#title{
  padding-left: 2em;
}

#btnAjouterCours{
  padding-right: 2em;
  padding-bottom: 2em;
}

#sendMail{
  padding-left:3em;
  padding-top: 7px;
}

.btnMail {
  background-color: rgb(173, 173, 173);
  color: #5a5a5a;
  text-align: center;
  font-size: 15px;
  padding: 5px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  cursor: pointer;
}

.btnCours {
  background-color: blue;
  color: #eeee;
  text-align: center;
  font-size: 15px;
  padding: 5px;
  width: 120px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
  cursor: pointer;
}

#table{
  margin:4px;
  border-radius: 4px;
}


</style>
