<template>
  <div>
    <v-form v-model="valid">
      <v-row class="justify-space-between ma-5">
        <LessonDetailsIntroduction :state-name="$props.datas" />
        <div class="d-flex">
          <v-btn
            v-if="$props.datas !== 'new'"
            color="grey darken-2"
            fab
            text
            @click="
              $store.commit('overlay/open', {
                component: 'LessonModificationForm',
                props: {
                  lesson,
                  archive: true,
                  redirectPath: '/professor/lesson/list',
                },
                title: lesson.recurrenceId ? 'Voulez-vous archiver :' : '',
              })
            "
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
          <v-btn
            v-if="$props.datas !== 'new'"
            color="grey darken-2"
            fab
            text
            @click="
              $store.commit('overlay/open', {
                component: 'MessageForm',
                props: { recipients: [lesson], type: 'lesson' },
                title: 'Tapez votre message',
              })
            "
          >
            <v-icon> mdi-message </v-icon>
          </v-btn>
          <v-btn
            v-if="valid && $props.datas === 'new'"
            color="grey darken-2"
            fab
            text
            @click="create"
          >
            <v-icon> mdi-content-save </v-icon>
          </v-btn>
          <v-btn
            v-if="$props.datas === 'new' && hasModifications"
            color="grey darken-2"
            fab
            text
            @click="$store.dispatch('lesson/resetNewForm')"
          >
            <v-icon> mdi-arrow-u-down-left </v-icon>
          </v-btn>
          <div v-if="$props.datas !== 'new' && hasModifications && valid">
            <v-btn
              color="grey darken-2"
              fab
              text
              @click="
                $store.commit('overlay/open', {
                  component: 'LessonModificationForm',
                  props: {
                    lesson,
                    payload: $store.state.lesson.form.payload,
                    modify: true,
                  },
                  title: lesson.recurrenceId ? 'Voulez-vous enregistrer :' : '',
                })
              "
            >
              <v-icon> mdi-content-save </v-icon>
            </v-btn>
            <v-btn
              color="grey darken-2"
              fab
              text
              @click="
                $store.dispatch('resetEditionForm', {
                  storeName: 'lesson',
                  stateName: $props.datas,
                })
              "
            >
              <v-icon> mdi-arrow-u-down-left </v-icon>
            </v-btn>
          </div>
        </div>
      </v-row>
      <v-col>
        <v-row >
          
         <LessonDetailsinformation :datas="$props.datas" />
         <LessonDetailDate :state-name="$props.datas" />
        </v-row>

        
     <LessonPictureInput picture-datas="picture.lessonPictureSelected" />
        <v-row class="justify-center">
         
            <div class="pa-3">
                <v-row >
            <LessonDetaildescription :state-name="$props.datas" />
            <LessonDescription :state-name="$props.datas" />
            </v-row>
            </div>
      
        </v-row>
      </v-col>
    </v-form>
  </div>
</template>

<script>
import { Recurrence } from '../enums/Recurrence'
import LessonDetailDate from './LessonDetailDate.vue'
import LessonPictureInput from './LessonPictureInput.vue';
export default {
    props: {
        datas: {
            type: String,
            required: true,
        },
    },
    computed: {
        lesson() {
            return this.$store.state.lesson[this.$props.datas];
        },
        valid: {
            get() {
                return this.$store.state.lesson.form.valid;
            },
            set(newValue) {
                this.$store.commit("lesson/modify", {
                    stateName: "form",
                    payload: { valid: newValue },
                });
            },
        },
        recurrence() {
            if (this.$store.state.lesson[this.$props.datas] === undefined)
                return "";
            const recurrence = this.$store.state.lesson[this.$props.datas].recurrence;
            return Recurrence[recurrence];
        },
        hasModifications() {
            if (this.$store.state.lesson.form.payload === undefined)
                return false;
            return Object.keys(this.$store.state.lesson.form.payload).length > 0;
        },
        open() {
            return this.$props.datas === "new";
        },
    },
    methods: {
        create() {
            const lessonDatas = { ...this.$store.state.lesson.new, ...this.$store.state.lesson.form.payload };
            this.$store.dispatch("lesson/create", { lessonDatas });
            this.$router.push("/professor/lesson/list");
        },
    },
    components: { LessonDetailDate, LessonPictureInput }
}
</script>

<style>
.recurrence-title {
  margin-bottom: 14px;
  color: rgb(87, 87, 87);
}
</style>