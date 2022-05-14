<template>
  <div class="card">
    <div class="img__text">
      <img :src="picture" alt="Image" />

      <div class="text">
        <h1 class="titre">{{ lesson.title }}</h1>
        <h3>{{ newDate }}</h3>
        <h5 class="description">
          {{ lesson.description || 'pas de description' }}
        </h5>
      </div>
    </div>

    <UnsubscribeButton :lesson="$props.lesson" />
  </div>
</template>

<script>
import { convertTimestampToReadableDate } from '~/services/dateHelper'

export default {
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      picture: ''
    }
  },
  computed: {
    newDate() {
      return convertTimestampToReadableDate(this.$props.lesson.startDate)
    }
  },
  async created() {
    this.picture = await this.$store.dispatch('picture/get', { fileName: this.lesson.coverPicture })
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
  display: flex;
  flex-direction: column;
  width: 10vw;
  min-width: 200px;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
