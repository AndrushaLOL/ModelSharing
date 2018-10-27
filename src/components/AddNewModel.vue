<template>
    <div  v-if='!!user'>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
        <v-stepper v-model="e1">
        <v-stepper v-model="e1" style='margin: 100px 0 50px 0'>
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Upload a file</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">You're done!</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                        <h2 class="font-weight-thin">Pick a name</h2>
                        <v-card class='elevation-0'>
                            <v-text-field type="text" label="Name" :rules="nameRules" class="mb-5" v-model='name'></v-text-field>
                            <h2 class="font-weight-thin">Choose category</h2>
                            <v-select class="mb-5" :rules="catRules" :items="categories" label="Category.." v-model='category'></v-select> 
                            <h2 class="font-weight-thin mb-2">Some tags</h2>
                            <v-combobox v-model="tags" 
                            :items="items"  
                            chips clearable
                            label='Tags..' 
                            solo multiple>
                                <template slot="selection" slot-scope="data" class="mb-5"> 
                                    <v-chip :selected="data.selected" close @input="remove(data.item)">
                                        <strong>{{ data.item }}</strong>&nbsp;
                                    </v-chip>
                                </template>
                            </v-combobox> 
                        </v-card>
                    <v-btn v-if='name&&category' color="primary" @click="e1 = 2">Continue</v-btn>
                    <v-btn v-else disabled>Continue</v-btn>        
                    <v-btn flat @click="e1 = 1">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                        <v-card class="elevation-0">
                            <v-btn flat color="indigo lighten-2">
                            <h2 class="font-weight-thin mb-4">Select a photo</h2>
                            <v-btn flat color="indigo lighten-2">
                            <input  id='file_upload' type="file" @change="filesChange($event.target.files)">
                            Select
                            </v-btn>
                            <span v-if="!!file">{{fileName}}</span>
                            <br>
                            <v-btn @click="addModel" v-if='!!file'>upload</v-btn>
                            <v-progress-linear v-if='loading' v-model="percents" color="indigo lighten-1"></v-progress-linear>
                            <br>
                            <h2 class="font-weight-thin mb-4">Upload a file</h2>
                            <v-btn flat color="indigo lighten-2">
                            <v-btn flat color="indigo lighten-2">
                            <input  id='file_upload' type="file" @change="filesChange($event.target.files)" multiple accept=".png,.jpg">
                            Upload
                            </v-btn>
                            <span v-if="!!file">{{fileName}}</span>
                            <br>
                            <v-btn @click="addModel" v-if='!!file'>upload</v-btn>
                            <v-progress-linear v-if='loading' v-model="percents" color="indigo lighten-1"></v-progress-linear>

                            <v-alert type="error" :value="error"></v-alert>
                            <h2 class="font-weight-thin mb-4">Summary</h2>
                            <v-textarea solo auto-grow name="input-7-1" label="Summary" value="" v-model='summary'></v-textarea>
                        </v-card>
                    <v-btn color="primary" @click="e1 = 3">Continue</v-btn>
                    <v-btn flat @click="e1 = 1">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card class="mb-5" color="grey lighten-1" height="600px">
                    </v-card>                          
                    <v-btn color="primary" to="/">Done</v-btn>                   

                    <v-btn flat @click="e1 = 2">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-flex>
    </div>
</template>


<script>
import {storageModelsRef, dbModelsRef} from '@/firebase'
import {auth} from '../firebase'

export default {
    name: 'AddNewModel',
    data () {
        return {
            categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
            file: null,
            items: [],
            url: '',
            e1: null,
            name: '',
            tags: [],
            summary: '',
            category: '',
            error: '',
            loading: false,
            percents: 0,
            drawer: null,
            nameRules: [
                value => !!value || 'Name is required'
            ],
            catRules: [
                value => !!value || 'Category is required'
            ]
        }
    },

    computed: {
        user () {
            return this.$root.$data.user
        },
        fileName () {
            return this.file.name.split('').slice(0, 15).join('')+"..."
        }
    },
    methods: {
        filesChange(files) {
            this.file = files[0]
            this.addModel()
        },

        addModel() {
            let that = this
            if (!this.file) return
            const uploadTask = storageModelsRef.child(this.file.name).put(this.file)
            this.url = uploadTask.snapshot.ref.getDownloadURL()
            uploadTask.on('state_changed', (snapshot) => {
                let total = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (snapshot.state == 'running') {
                    this.loading = true
                }
                if (total == 100) {
                    this.loading = false
                }
                if (typeof this.url !== 'object') {
                    if (typeof this.url.i !== 'string') {
                        this.url = snapshot.ref.getDownloadURL()
                    }
                }
                this.percents = total
            },
            function (error) {
                that.error = error
            },
            function ()  {
                that.error = ''
                that.percents = 0
                console.log('pushed!')
                dbModelsRef.push({
                    name: that.name,
                    category: that.category,
                    tags: that.tags,
                    summary: that.summary,
                    url: that.url['i']
                })
            })
        },
        remove (item) {
            this.tags.splice(this.tags.indexOf(item), 1)
            this.tags = [...this.tags]
        }
    }
}
</script>

<style scoped>
#file_upload {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>
