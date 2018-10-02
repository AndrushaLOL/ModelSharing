<template>
<v-layout row wrap>
    <v-flex xs3 offset-xs3>
        <div>
            <input type="file" @change="filesChange($event.target.files)">
            <span v-if="!!file">{{file.name[0, 7]+"..."}}</span>
            <v-btn @click="addModel">upload</v-btn>
            <v-progress-linear v-model="percents" color="indigo lighten-1" ></v-progress-linear>
        </div>    
    </v-flex>
</v-layout>
</template>

<script>
import {modelsRef} from '@/firebase'

export default {
    name: 'AddNewModel',
    data () {
        return {
            file: null,
            url: '',
            loading: false,
            percents: 0
        }
    },

    methods: {
        filesChange(files) {
            this.file = files[0]
        },

        addModel() {
            if (!this.file) return
            const uploadTask = modelsRef.child(this.file.name).put(this.file)
            //   .then((snapshot) => {
            //       this.url = snapshot.ref.getDownloadURL()
            //   })
            uploadTask.on('state_changed', (snapshot) => {
                let total = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (snapshot.state == 'running') {
                    this.loading = true
                }
                if (total == 100) {
                    this.loading = false
                }
                this.percents = total
                console.log((snapshot.bytesTransferred / snapshot.totalBytes) * 100, snapshot.state, snapshot)
            })
        }
    }
}
</script>
