<template>
  <v-container fluid>
    <div id="whole">
      <div id="top">
        <h1>Inscription cours</h1>
        <h2>Prix:</h2>
      </div>
      <v-col cols="12" sm="6">
        <v-select
          v-model="value"
          :items="this.selected"
          chips
          label="Participants"
          multiple
          outlined
        ></v-select>
      </v-col>
      <v-btn
      id="btn"
        elevation="6"
        color="light-green accent-4"
        @click="addParticipants = !addParticipants"
        >S'inscrire</v-btn
      >
    </div>
  </v-container>
  <!-- <v-card
    class="mx-auto"
    max-width="500"
  >

    <v-container class="py-0">
      <v-row
        align="center"
        justify="start"
      >
        <v-col
          v-for="(selection, i) in selections"
          :key="selection.nom"
          class="shrink"
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            <v-icon
              left
              v-text="selection.icon"
            ></v-icon>
            {{ selection.nom }}
          </v-chip>
        </v-col>

        <v-col
          v-if="!allSelected"
          cols="12"
        >
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="!allSelected"></v-divider>

    <v-list>
      <template v-for="item in categories">
        <v-list-item
          v-if="!selected.includes(item)"
          :key="item.nom"
          chips
          :disabled="loading"
          @click="selected.push(item)"
        >
          <v-list-item-avatar>
            <v-icon
              :disabled="loading"
              v-text="item.icon"
            ></v-icon>
          </v-list-item-avatar>
          <v-list-item-title v-text="item.nom"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!selected.length"
        :loading="loading"
        color="purple"
        text
        @click="next"
      >
       </v-btn>
    </v-card-actions>
  </v-card> -->
</template>

<script>
export default {
  data: () => ({
    items: {},
    value: [],
    loading: false,
    search: '',
    selected: [],
    i:'',
  
  }),
  created(){
this.getacompangnement()
  },
  

  computed: {
    allSelected() {
      return this.selected.length === this.items.length
    },
    categories() {
      const search = this.search.toLowerCase()

      if (!search) return this.items

      return this.items.filter((item) => {
        const nom = item.nom.toLowerCase()

        return nom.includes(search) > -1
      })
    },
    selections() {
      const selections = []

      for (const selection of this.selected) {
        selections.push(selection)
      }

      for (const item of this.items) {
        selections.push(item.firstName)
        // if (selections.length < 1) {
        //   selections.push(item)
        // }
      }
      // selections.push(items[0])

      return selections
    },
    
  },

  watch: {
    selected() {
      this.search = ''
    },
  },

  methods: {
    next() {
      this.loading = true

      setTimeout(() => {
        this.search = ''
        this.selected = []
        this.loading = false
      }, 2000)
    },
     async getacompangnement(){
 
      this.items=await  this.$store.dispatch('user/recupuser' )

    },
  },
  
}
</script>

<style scoped>
#whole {
  display:flex;
  flex-direction: column;
}

#top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#btn {
    width: 19vh;
    height: 4vh;
}
</style>