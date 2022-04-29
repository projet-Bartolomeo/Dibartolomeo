<template>
    <div>
        <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Choisissez l'image de votre cours"
            prepend-icon="mdi-camera" label="L'image de mon cours" @change="onFileSelected">
        </v-file-input>
        <v-img max-height="100" max-width="100" :src="pictureToDisplay"></v-img>
    </div>
</template>

<script>
export default {
    data() {
        return {
            pictureDatas: undefined,
            rules: [
                value => !value || value.size < 20000000 || "La taille de l'image devrait etre inférieur à 20MB",
            ]
        }
    },
    methods: {
        onFileSelected(file) {
            this.pictureDatas = file
        },
    }
}
</script>
