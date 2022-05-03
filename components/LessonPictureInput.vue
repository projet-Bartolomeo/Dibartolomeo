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

export default {
    props: {
        pictureDatas: {
            required: true,
            type: String,
        },
    },
    data() {
        return {
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
            const hasSetNewPicture = this.$store.state.picture.newPictureSelected
            return hasSetNewPicture ? this.$store.state.picture.newPictureSelected : this.getInitialPictureStore.value
        }
    },
    methods: {
        onFileSelected(picture) {
            this.$store.dispatch('picture/setNew',
                {
                    newPicture: picture,
                    initialPictureValue: this.getInitialPictureStore.value,
                    fieldName: this.getInitialPictureStore.fieldName
                }
            )
        },
    },
}
</script>

<style>
.lessonPictureInput-container {
    width: 100%;
}
</style>
