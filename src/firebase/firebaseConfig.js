import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// usamos Firebase 9 pero empleamos /compat para retrocompatibilizar el formato de acceso al estilo de v8


// Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBTNHSTCVacBhikfjhkiUcf-21K8B-viEM",
    authDomain: "journalapp-52128.firebaseapp.com",
    projectId: "journalapp-52128",
    storageBucket: "journalapp-52128.appspot.com",
    messagingSenderId: "80593643212",
    appId: "1:80593643212:web:26c51bc08fede561e84469"
};

firebase.initializeApp(firebaseConfig); // Initialize Firebase

const db = firebase.firestore(); // Referencia a la BBDD en Firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // referencia al provider de Firebase auth

export {
    db, // Referencia a la base de datos
    googleAuthProvider, // refrencia a Auth Provider
    firebase //referencia a firebase
}