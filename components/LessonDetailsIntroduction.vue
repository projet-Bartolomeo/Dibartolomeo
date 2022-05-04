<template>
    <v-col class="pa-0">
        <v-row class="ma-0 align-center d-flex">
            <TextField :get="`lesson.${$props.stateName}.title`" :rules="[(v) => !!v || 'Le titre est obligatoire']"
                title :open="open" placeholder="Entrez le titre" />
        </v-row>
        <v-row class="ma-0">
            <p class="ma-0 align-center d-flex">
                {{ $props.studentIds ? $props.studentIds.length : 0 }}/
            </p>
            <TextField :suffix="$props.stateName === 'new' ? '' : 'élèves'"
                :get="`lesson.${$props.stateName}.maximumStudents`" :rules="[
                    (v) => !!v || 'Le nombre maximum d\'élèves est obligatoire',
                    (v) =>
                        !isNaN(Number(v)) ||
                        'Le nombre maximum d\'élèves doit etre un nombre',
                ]" number :open="open" placeholder="Entrez le nb max d'élèves" />
        </v-row>
    </v-col>
</template>

<script>
export default {
    props: {
        stateName: {
            type: String,
            required: true
        },
    },
    computed: {
        open() {
            return this.$props.stateName === 'new'
        },
        studentIds() {
            const lesson = this.$store.state.lesson[this.$props.stateName]
            return lesson ? lesson.studentIds : 0
        }
    }
}
</script>
