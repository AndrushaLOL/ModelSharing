<template>
    <div  v-if='!!user'>
    <v-flex xs12 sm6 offset-sm3 class="mt-5">
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                    <!-- Upload file image -->
                    <v-card class="elevation-0">
                        <h2 class="font-weight-thin mb-4">Select item pic</h2>
                        <v-btn flat color="indigo lighten-2">
                        <input  type="file" id='image_upload' accept="image/*" @change="filesChange($event.target.files)">
                        Select
                        </v-btn>
                        <!-- Price -->
                        <h2 class="font-weight-thin mb-4">Set the price</h2>
                        <v-text-field type="number" label="Price" :rules='required' class="mb-5" v-model='price'></v-text-field>
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
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            imageLoad: false,
            modelLoad: false,
            required: [
                v => !!v || 'Required'
            ],
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

        cancel(){
            this.name = ''
            this.category = ''
            this.description = ''
            this.e1 = 1
            this.file = null
            this.image = null
            this.tags = []
        },
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
        filesChange(files) {
            this.file = files[0]
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                }
                if (typeof this.urlImg !== 'object') {
                    if (typeof this.urlImg.i !== 'string') {
                        this.urlImg = snapshot.ref.getDownloadURL()
                        this.imgTrue = true
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
                }
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

            () => {
                if (currentFile == 'image') {
                    this.urlImg = uploadTask.snapshot.ref.getDownloadURL()
                    this.imageLoad = true
                } else {
                    this.url = uploadTask.snapshot.ref.getDownloadURL()
                    this.modelLoad = true
                }
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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            }

=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
            })
        },
        remove (item) {
            this.tags.splice(this.tags.indexOf(item), 1)
            this.tags = [...this.tags]
        }
    }
}
</script>

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<style>
    #step{
        margin: 200px 0 50px 0;
    }
#model_upload, #image_upload {
=======
=======
>>>>>>> parent of 2e5ab5b... фыа
=======
>>>>>>> parent of 2e5ab5b... фыа
<style scoped>
#file_upload {
>>>>>>> parent of 2e5ab5b... фыа
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
