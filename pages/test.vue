<template>
<main>
  <button @click="open=!open">Nouveau message</button>
  <popup v-if="open">
    <div class="d-flex justify-end">
    <button @click="open=!open" class="popup-close">
      <v-icon>mdi-close</v-icon>
    </button>
    </div>
    <send-message/>
  </popup>
</main>
</template>

<script lang="ts">
export default({
  data () {
    return {
      open: false
    }
  }
})
</script>

<style>
.popup-close {
  display: flex;
  align-items: end;
}
</style>