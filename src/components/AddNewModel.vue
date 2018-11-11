<template>
    <div  v-if='!!user'>
    <v-flex xs12 sm10 offset-sm1 md6 offset-md3>
        <v-stepper v-model="e1"  id='step'>
            <v-stepper-header id='stepHeader'>
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
                            <v-text-field type="text" label="Name" :rules="required" class="mb-5" v-model='name'></v-text-field>
                            <h2 class="font-weight-thin">Choose category</h2>
                            <v-select class="mb-5" :rules="required" :items="categories" label="Category.." v-model='category'></v-select> 
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
                    <v-btn flat @click="cancel">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="2">
                        <v-card class="elevation-0">
                            <h2 class="font-weight-thin mb-4">Upload a file</h2>
                            <v-btn color="blue-grey"
                            :loading="loading3"
                            :disabled="loading3" 
                            class="white--text mb-5" 
                            @click.native="loader = 'loading3'"
                            >
                            <input  id='model_upload' type="file" @change="filesChange">Upload   
                            <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                            <span v-if="!!file" class="ml-4">{{fileName}}</span>
                            <h2 class="font-weight-thin mb-4">Description</h2>
                            <v-textarea solo
                            :rules='descipt' 
                            class='mb-5' 
                            auto-grow 
                            name="description" 
                            label="Describe your item"
                            counter 
                            v-model='description'>           
                            </v-textarea>
                        </v-card>
                    <v-btn v-if='!!file' color="primary" @click="e1 = 3" >Continue</v-btn>
                    <v-btn v-else disabled>Continue</v-btn>
                    <v-btn flat @click="cancel">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card class="elevation-0">
                        <h2 class="font-weight-thin mb-5">Select item pic</h2>
                        <v-btn 
                        class='mb-5'
                        :loading="loading4"
                        :disabled="loading4"
                        color="blue-grey"
                        dark
                        @click.native="loader = 'loading4'">
                        <input  type="file" id='image_upload' multiple accept="image/*" @change="imagesChange">Select
                        <v-icon right dark>photo</v-icon>
                        </v-btn>
                        <img v-if='!!file2' :src='imageSrc'  class='ml-1' id='itemImage' />
                        <h2 class="font-weight-thin mb-5">Set the price</h2>
                        <v-text-field v-if='!!file2' type="number" label="Price"  :rules='required' class="mb-2" v-model='price'></v-text-field>
                        <v-text-field v-else type="number" label="Price"  :rules='required' class="mb-5" v-model='price'></v-text-field>
                    </v-card>              
                    <v-btn v-if='!!file2' to='/' color="primary" @click='push'>Submit</v-btn>
                    <v-btn v-else disabled class='mt-5'>Submit</v-btn>
                    <v-btn v-if='!!file2' class='mt-2' flat @click="cancel">Cancel</v-btn>                   
                    <v-btn v-else class='mt-5' flat @click="cancel">Cancel</v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-flex>
    </div>
</template>


<script>
import {storageModelsRef, storageImagesRef, dbModelsRef} from '@/firebase'
import {auth} from '../firebase'

export default {
    name: 'AddNewModel',
    data () {
        return {
            imageSrc: null,
            loader: null,
            loading3: false,
            categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
            file: null,
            items: [],
            file2: null,
            price: '',
            url: '',
            urlImg: '',
            e1: null,
            name: '',
            tags: [],
            description: '',
            category: '',
            uploadTask: null,
            error: '',
            imageLoad: false,
            modelLoad: false,
            loading4: false,
            percents: 0,
            drawer: null,
            required: [
                v => !!v || 'Required'
            ],
            descipt: [
                v => v.length > 40 ? !!v : 'Min 40 characters'
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
        filesChange(e){
            this.file = e.target.files[0]
            this.addModel('model')
        },
        imagesChange(e){
            this.file2 = e.target.files[0]
            if (this.file2) {
                const reader = new FileReader()
                const vm = this
                reader.onload = (e) => {
                    vm.imageSrc = e.target.result
                }

                reader.readAsDataURL(this.file2)
             }
            this.addModel('image')
        },
        cancel(){
            this.name = ''
            this.category = ''
            this.description = ''
            this.e1 = 1
            this.file = null
            this.file2 = null
            this.tags = []
            },
        addModel(currentFile) {
            if (currentFile == 'image'){
                this.uploadTask = storageImagesRef.child(this.file2.name).put(this.file2)
            } else {
                this.uploadTask = storageModelsRef.child(this.file.name).put(this.file)
            }
            
            this.uploadTask.on('state_changed', (snapshot) => {
                let total = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (snapshot.state == 'running') {
                    if (currentFile == 'image'){
                        this.loading4 = true
                    }
                    else {
                        this.loading3 = true 
                    }
                }
                if (total == 100) {
                    if (currentFile == 'image'){
                        this.loading4 = false
                    }
                    else {
                        this.loading3 = false 
                    }
                }
                
                this.percents = total        
            },
            (error) => {
                this.error = error.message 
            },
            () => {
                if (currentFile == 'image') {
                    this.urlImg = this.uploadTask.snapshot.ref.getDownloadURL()
                    this.imageLoad = true
                } else {
                    this.url = this.uploadTask.snapshot.ref.getDownloadURL()
                    this.modelLoad = true
                }
             this.error = ''
             this.percents = 0
            })
        },
        push() {
            if (this.imageLoad&&this.modelLoad) {
                console.log('pushed')
                dbModelsRef.push({
                    description: this.description,
                    price: this.price,
                    name: this.name,
                    category: this.category,
                    tags: this.tags,
                    urlImg: this.urlImg['i'],
                    url: this.url['i']
                })
            }
        },
        remove (item) {
            this.tags.splice(this.tags.indexOf(item), 1)
            this.tags = [...this.tags]
        }
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      }
    }
}
</script>

<style>
    #step{
        margin: 200px 0 50px 0;
        height: 570px;
    }
#model_upload, #image_upload {
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

  #itemImage{
    width: 130px;
    height: 130px;
  }  





  @media screen and (min-width: 375px) and (max-width: 750px) and (min-height: 750px){
    #step {
      margin: 130px 0 0 0;
    }
  }
  @media screen and (min-width: 375px) and (max-width: 750px) and (max-height: 750px){
    #step{
        margin: 100px 0 0 0;
    }
  }
  @media screen and (max-width: 360px) and (max-height: 750px){
    #step {
        margin: 65px 0 0 0;
        height: 560px;
    }
  }
  @media screen and (max-width: 320px){
    #step {
        margin: 50px 0 0 0;
        height: 518px;
    }
    #stepHeader {
        height: 40px
    }
  }   
</style>
