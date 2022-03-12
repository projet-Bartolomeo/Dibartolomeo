<template>
  <div class="card">
    <div class="img__text">
      <img :src="image" alt="Image" />

      <div class="text">
        <h1 class="titre">{{ title }}</h1>
        <h3 >{{ newDate }}</h3>
        <h5 class="description">
          {{ description }}
        </h5>
      </div>
    </div>

    <v-btn color="#fa3257" class="white--text" large >Se désinscrire</v-btn>
  </div>
</template>

<script lang="ts">
import { convertTimestampToReadableDate } from '~/services/dateHelper'

export default {
  props: {
    image: {
      type: String,
      required: false,
      default: '/image/cours.jpg',
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Object,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: 'pas de description',
    },
  },

  computed: {
    newDate() {
      return convertTimestampToReadableDate(this.$props.date)
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
