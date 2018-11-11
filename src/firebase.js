import firebase from 'firebase'


const config = {
    apiKey: "AIzaSyDCH51vUuGZ3z63pMCKes0OS3gDVafw6uQ",
    authDomain: "model-sharing.firebaseapp.com",
    databaseURL: "https://model-sharing.firebaseio.com",
    projectId: "model-sharing",
    storageBucket: "model-sharing.appspot.com",
    messagingSenderId: "338621657520"
}

const app = firebase.initializeApp(config)


export const provider = new firebase.auth.GoogleAuthProvider()
export const provider3 = new firebase.auth.FacebookAuthProvider()


export const storageImagesRef = app.storage().ref().child('images')
export const storageModelsRef = app.storage().ref().child('models')
export const dbModelsRef = app.database().ref('models/')
export const dbUsersRef = app.database().ref('users/')
export const auth = app.auth()


