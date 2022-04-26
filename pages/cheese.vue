<template>
  <div>
    <p>ye</p>
    <input type="file" accept="image/*" @change="onFileSelected"/>
    <button @click="onUpload()">Upload</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        selectedFile: null
    }
  },
    methods: {
       onFileSelected(event) {
           console.log(event)
           this.selectedFile = event.target.files[0]
       },
       onUpload() {

       }
    }   
}
</script>
