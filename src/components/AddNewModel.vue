    <template>
    <div  v-if='!!user'>
    <v-flex xs12 sm10 offset-sm1 md6 offset-md3 >
        <v-stepper v-model="e1" id='step'>
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
                            class="white--text" 
                            @click.native="loader = 'loading3'"
                            >
                            <input  id='model_upload' type="file" @change="filesChange">Upload   
                            <v-icon right dark>cloud_upload</v-icon>
                            </v-btn>
                            <span v-if="!!file">{{fileName}}</span>
                            <h2 class="font-weight-thin mb-4">Description</h2>
                            <v-textarea solo auto-grow name="description" label="Describe your item" v-model='description'></v-textarea>
                        </v-card>
                    <v-btn v-if="!!file" color="primary" @click="e1 = 3" >Continue</v-btn>
                    <v-btn v-else disabled>Continue</v-btn>
                    <v-btn flat @click="cancel">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <v-card class="elevation-0">
                        <h2 class="font-weight-thin mb-4">Select item pic</h2>
                        <v-btn 
                        :loading="loading4"
                        :disabled="loading4"
                        color="blue-grey"
                        dark
                        @click.native="loader = 'loading4'">
                        <input  type="file" id='image_upload' accept="image/*" @change="imagesChange">Select
                        <v-icon right dark>photo</v-icon>
                        </v-btn>
                        <h2 class="font-weight-thin mb-4">Set the price</h2>
                        <v-text-field type="number" label="Price" :rules='required' class="mb-5" v-model='price'></v-text-field>
                    </v-card>              
                    <v-btn v-if='!!file2' to='/' color="primary" @click='allLoaded'>Submit</v-btn>
                    <v-btn v-else disabled>Submit</v-btn>                   
                    <v-btn flat @click="cancel">Cancel</v-btn>
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
            this.addModel('image')
        },
        cancel(){
            this.name = ''
            this.category = ''
            this.description = ''
            this.e1 = 1
            this.file = null
            this.image = null
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
        allLoaded() {
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

  @media screen and (max-width: 1000px){
    #step {
      margin: 125px 0 50px 0;
    }
  }  
</style>
