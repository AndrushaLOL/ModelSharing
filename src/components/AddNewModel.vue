<template>
    <div>
     <input type="file" @change="filesChange($event.target.files)">
     <span>{{file.name}}</span>
     <span>{{this.$root.$data.user.toString()[0, 10]+'...'}}</span>
     <button @click="addModel">upload</button> 
    </div>    
</template>

<script>
import {modelsRef} from '@/firebase'

export default {
    name: 'AddNewModel',
    data () {
        return {
            file: {},
            url: ''
        }
    },

    methods: {
        filesChange(files) {
            this.file = files[0]
        },

        addModel() {

            const uploadTask = modelsRef.child(this.file.name).put(this.file)
            //   .then((snapshot) => {
            //       this.url = snapshot.ref.getDownloadURL()
            //   })
            uploadTask.on('state_changed', (snapshot) => {
                console.log(snapshot.totalBytesTransferred)
            })
        }
    }
}
</script>
