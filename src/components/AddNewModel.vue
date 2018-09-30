<template>
    <div>
     <input type="file" @change="this.files = $event.target.files">
     <div v-for="file in files" :key="file.name">
         <span>{{ file.name }}</span>
     </div>
     <button @click="addModel"></button> 
    </div>    
</template>

<script>
import {storageRef} from '@/firebase'

export default {
    name: 'AddNewModel',
    data () {
        return {
            files: []
        }
    },

    methods: {
        addModel() {
            for(let file of this.files) {
                storageRef.child(file.name).put(file)    
            }
        }
    }
}
</script>
