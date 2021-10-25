<template>
  <v-container fluid>
    <v-row align="center">
    <v-btn>Annumler</v-btn>
    <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            counter="5"
            hint="This field uses counter prop"
            label="Nom du cour"
          ></v-text-field>
</v-col>
      <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items"
          label="Répétiton"
        ></v-select>
      </v-col>
            <v-col
        class="d-flex"
        cols="12"
        sm="6"
      >
        <v-select
          :items="items2"
          label="Age"
        ></v-select>
      </v-col>
              <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="title"
            :rules="rules"
            counter="25"
            hint="This field uses counter prop"
            label="Nom du cour"
          ></v-text-field>
</v-col>
       <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          filled
          auto-grow
          label="message"
          rows="4"
          row-height="30"
          shaped
        ></v-textarea>
      </v-col>
      <v-col
        cols="12"
        sm="6"
      >
        <v-textarea
          filled
          auto-grow
          label="message"
          rows="4"
          row-height="30"
          shaped
        ></v-textarea>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      items: ['Chaque semaine', 'Chaque jour', 'chaque mois','unique'],
       items2: ['Senior', 'Jeune', 'Semie'],
    }),
  }
</script>