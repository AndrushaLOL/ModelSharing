    <template>
    <div  v-if='!!user'>
    <v-flex xs12 sm6 offset-sm3 >
        <v-stepper v-model="e1" id='step'>
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">Information</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">Upload a file</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">You're done!</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <!--Name, category and tags-->
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
                <!-- end -->
                <!-- Upload files, description, price -->
                <v-stepper-content step="2">
                        <!-- Upload model file -->
                        <v-card class="elevation-0">
                            <h2 class="font-weight-thin mb-4">Upload a file</h2>
                            <v-btn flat color="indigo lighten-2">
                            <input  id='file_upload' type="file" @change="filesChange($event.target.files)">
                            Upload
                            </v-btn>
                            <span v-if="!!file">{{fileName}}</span>
                            <!-- description -->
                            <h2 class="font-weight-thin mb-4">Description</h2>
                            <v-textarea solo auto-grow name="description" label="Describe your item" v-model='description'></v-textarea>
                        </v-card>
                        <!-- end -->
                    <v-btn color="primary" @click="e1 = 3" v-if='!!file'>Continue</v-btn>
                    <v-btn v-else disabled>Continue</v-btn>
                    <v-btn flat @click="cancel">Cancel</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
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
                    </v-card>              
                    <v-btn @click="addModel"  color="primary">Done</v-btn>
                    <v-progress-linear v-if='loading' v-model="percents" color="indigo lighten-1"></v-progress-linear>
                    <v-alert type="error" :value="error"></v-alert>                   
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
            categories: [ 'Household', 'Gadgets', 'Art', 'Hobby', 'Toys'],
            file: null,
            items: [],
            file2: null,
            price: '',
            fileTrue: false,
            imgTrue: false,
            url: '',
            urlImg: '',
            e1: null,
            name: '',
            tags: [],
            description: '',
            category: '',
            error: '',
            loading: false,
            percents: 0,
            drawer: null,
            imageLoad: false,
            modelLoad: false,
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
        },
        allLoaded () {
            return this.imageLoad && this.modelLoad
        }
    },
    methods: {
        cancel(){
            this.name = ''
            this.category = ''
            this.description = ''
            this.e1 = 1
            this.file = null
            this.image = null
            this.tags = []
        },
        filesChange(files) {
            this.file = files[0]
            this.file2 = files[1]
        },
        addModel(file, ref, currentFile) {
            if (!this.file) return
            const uploadTask = ref.child(file.name).put(file)
            uploadImage.on('state_changed', (snapshot) => {
                let total = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (snapshot.state == 'running') {
                    this.loading = true
                }
                if (total == 100) {
                    this.loading = false
                }
                if (typeof this.urlImg !== 'object') {
                    if (typeof this.urlImg.i !== 'string') {
                        this.urlImg = snapshot.ref.getDownloadURL()
                        this.imgTrue = true
                    }
                }
                this.percents = total
            },
            (error) => {
                this.error = error.message 
            },
            () => {
                if (currentFile == 'image') {
                    this.urlImg = uploadTask.snapshot.ref.getDownloadURL()
                    this.imageLoad = true
                } else {
                    this.url = uploadTask.snapshot.ref.getDownloadURL()
                    this.modelLoad = true
                }
             this.error = ''
             this.percents = 0
                console.log('pushed!')
            })

        },

        remove (item) {
            this.tags.splice(this.tags.indexOf(item), 1)
            this.tags = [...this.tags]
        }
    },
    watch: {
        allLoaded(newVal, oldVal) {
            if (newVal) {

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
      margin: 600px 0 50px 0;
    }
  }  
</style>
