<template>
  <div class="card">
    <div class="img__text">
      <img :src="image" alt="Image" />

      <div class="text">
        <h1 class="titre">{{ title }}</h1>
        <h3 class="date">{{ date }}</h3>
        <h5 class="description">
          {{ description }}
        </h5>
      </div>
    </div>

    <v-btn color="#fa3257" class="white--text" large>Se désinscrire</v-btn>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    image: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: 'pas de description',
    },
  },
}
</script>

<style>
.titre {
  margin-top: 0;
}
.description {
  margin-top: 15px;
}
.card {
  display: flex;
  flex-flow: row wrap;
  padding: 20px;
  align-items: flex-end;
}
.img__text {
  display: flex;
  flex-flow: row wrap;
  align-items: start;
}
img {
  height: 200px;
  width: 200px;
  object-fit: cover;
}

.text {
  width: 10vw;
  min-width: 200px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
