<template>
<div>
<v-card elevation="6" width="45vw" height="8.8vh" min-height="55px">

         
        <v-row class="ma-0 align-center d-flex">
            
            <TextField :get="`lesson.${$props.stateName}.title`" :rules="[(v) => !!v || 'Le titre est obligatoire']"
                :open="open" placeholder="Entrez le titre" style=" margin-left: 90px" /> 
       
            <p class="ma-0 align-center d-flex">
                {{ $props.studentIds ? $props.studentIds.length : 0 }}/
            </p>
            <TextField :suffix="$props.stateName === 'new' ? '' : 'élèves'"
                :get="`lesson.${$props.stateName}.maximumStudents`" :rules="[
                    (v) => !!v || 'Le nombre maximum d\'élèves est obligatoire',
                    (v) =>
                        !isNaN(Number(v)) ||
                        'Le nombre maximum d\'élèves doit etre un nombre',
                ]" number :open="open" placeholder="Entrez le nb max d'élèves" style=" margin-left: 200px" />
        </v-row>
        

    </v-card>
    </div>
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
        lesson() {
            return this.$store.state.lesson[this.$props.stateName]
        },
        studentIds() {
            return this.lesson ? this.lesson.studentIds : 0
        }
    }
}
</script>
