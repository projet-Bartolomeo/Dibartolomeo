<template>
  <div >
       <v-container
    class="spacing-playground pa-6"
    fluid
  >
      <v-row>
      
   
       <v-menu
      ref="menu"
      v-model="startDateMenu"
      
      :return-value.sync="startDate"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="startDate"
          label="Picker in menu"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker

        v-model="startDate"
        @input="startDateMenu = false"
      ></v-date-picker>
      
    </v-menu>

    <v-menu
      ref="menu"
      v-model="menu"
     
      :return-value.sync="date"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="endDate"
          label="Picker in menu"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
   
        v-model="endDate"
        @input="endDateMenu = false"
      ></v-date-picker>
     
    </v-menu>
  
    </v-row>
     </v-container>
  </div>
      
</template>

<script>
export default {

  data() {
    return {
       startDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      startDateMenu:false,      
      endDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      endDateMenu:false,
    }
  },
 
}
</script>

<style>
.Datapicker {
  display: flex;
}

</style>
