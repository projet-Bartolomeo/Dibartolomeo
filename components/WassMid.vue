<template>
  <div
    style="
      width: 65vw;
      margin-top: 5vh;
      display: flex;
      justify-content: space-between;
    "
  >
    <div style="display: flex; flex-direction: column">
      <v-card
        elevation="6"
        width="30vw"
        height="37vh"
        style="margin-bottom: 5vh"
      >
        <v-text-field
          title
          :open="open"
          placeholder="récurrence"
          class="pa-6"
          style="padding-bottom: 0 !important"
          disabled
        ></v-text-field>
        <v-radio-group v-model="radioGroup" style="margin-top: 0">
          <div style="display: flex; flex-direction: row">
            <v-radio
              label="Chaque semaine"
              style="margin-left: 1.5vw; margin-right: 2vw"
            ></v-radio>
            <v-radio label="Unique"></v-radio>
          </div>
        </v-radio-group>
        <v-text-field
          title
          :open="open"
          placeholder="Tranche d'âge"
          class="pa-6"
          style="padding-bottom: 0 !important; padding-top: 0 !important"
          disabled
        ></v-text-field>
        <v-radio-group v-model="radioGroup" style="margin-top: 0">
          <div style="display: flex; flex-direction: row">
            <v-radio
              label="Adulte"
              style="margin-left: 1.5vw; margin-right: 2vw"
            ></v-radio>
            <v-radio label="Adolescent" style="margin-right: 2vw"></v-radio>
            <v-radio label="Enfant"></v-radio>
          </div>
        </v-radio-group>
        <v-text-field
          title
          :open="open"
          placeholder="Prix"
          class="pa-6"
          style="padding-bottom: 0 !important; padding-top: 0 !important"
          disabled
        ></v-text-field>
        <v-text-field
          label="Entrer le prix du cours"
          filled
          dense
          background-color="#f8f7f7"
          class="ma-3"
          style="margin-top: 0 !important; height: 5vh"
        ></v-text-field>
      </v-card>
      <v-card elevation="6" width="30vw" height="20vh"> </v-card>
    </div>
    <div style="display: flex; flex-direction: column">
      <v-card
        elevation="6"
        width="30vw"
        height="37vh"
        style="margin-bottom: 5vh"
      >
      </v-card>
      <v-card elevation="6" width="30vw" height="20vh"> </v-card>
    </div>
  </div>
</template>