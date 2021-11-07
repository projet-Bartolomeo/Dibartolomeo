<template>
  <main>
    <button @click="open = !open">Nouveau message</button>
    <v-overlay :value="open">
      <div class="d-flex justify-end">
        <button @click="open = !open" class="popup-close">
          <v-icon>mdi-close</v-icon>
        </button>
      </div>
      <send-message />
    </v-overlay>
    <datatable-students />
  </main>
</template>

<script lang="ts">
import DatatableStudents from '~/components/DatatableStudents.vue'
export default {
  components: { DatatableStudents },
  data() {
    return {
      open: false,
    }
  },
}
</script>