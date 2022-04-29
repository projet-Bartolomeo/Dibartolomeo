<template>
    <div class='lessonPictureInput-container'>
        <v-file-input class='flex-grow-1' :rules="rules" accept="image/png, image/jpeg, image/bmp"
            placeholder="Choisissez l'image de votre cours" prepend-icon="mdi-camera" label="L'image de mon cours"
            @change="onFileSelected">
        </v-file-input>
        <v-img max-height="100" max-width="100" :src="pictureToDisplay"></v-img>
    </div>
</template>

<script>
import { generateRandomId } from '../services/firestoreHelper'

export default {
    props: {
        pictureDatas: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
            pictureSelected: undefined,
            newPicture: undefined,
            rules: [
                value => !value || value.size < 20000000 || "La taille de l'image devrait etre inférieur à 20MB",
            ]
        }
    },
    computed: {
        getInitialPictureStore() {
            return this.$store.getters.getStateFromString(this.$props.pictureDatas)
        },
        pictureToDisplay() {
            const hasSetNewPicture = this.newPicture
            return hasSetNewPicture ? URL.createObjectURL(this.newPicture) : this.getInitialPictureStore.value
        }
    },
    methods: {
        onFileSelected(picture) {
            this.pictureToDisplay = URL.createObjectURL(picture)
            this.$store.commit('picture/set', { picture, stateName: this.getInitialPictureStore.fieldName })
            this.$store.commit(`lesson/modify`, {
                payload: { payload: { ...this.$store.state.lesson.form.payload, coverPicture: generateRandomId() } },
                stateName: 'form',
            })
        },
    },
}
</script>

<style>
.lessonPictureInput-container {
    width: 100%;
}
</style>
