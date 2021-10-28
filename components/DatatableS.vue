<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Mail',
          align: 'start',
          sortable: false,
          value: 'mail',
        },
        { text: 'Nom', value: 'nom' },
        { text: 'Prenom', value: 'prenom' },
        { text: 'Telephone', value: 'telephone' },
        { text: '', value: '' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
      ],
    }
  },
}
</script>
