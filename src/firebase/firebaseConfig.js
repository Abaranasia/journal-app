import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
// usamos Firebase 9 pero empleamos /compat para retrocompatibilizar el formato de acceso al estilo de v8


// Firebase configuration
/*
const firebaseConfig = { // BBDD de dev/prod

    apiKey: "AIzaSyBTNHSTCVacBhikfjhkiUcf-21K8B-viEM",
    authDomain: "journalapp-52128.firebaseapp.com",
    projectId: "journalapp-52128",
    storageBucket: "journalapp-52128.appspot.com",
    messagingSenderId: "80593643212",
    appId: "1:80593643212:web:26c51bc08fede561e84469",
};

const firebaseConfigTest = { // BBDD para testing
    apiKey: "AIzaSyB4iIi1RJfHqZUigq0sMpxHCrMmjIOLC5g",
    authDomain: "dev-test-df9b5.firebaseapp.com",
    projectId: "dev-test-df9b5",
    storageBucket: "dev-test-df9b5.appspot.com",
    messagingSenderId: "942957879339",
    appId: "1:942957879339:web:474e2f967362adc5668a6e"
  };


if (process.env.NODE_ENV === 'test') {

    firebase.initializeApp(firebaseConfigTest); // Initialize Firebase de la BBDD para testing

} else {

    firebase.initializeApp(firebaseConfig); // Initialize Firebase de la BBDD de dev/prod
}
 */


const firebaseConfig = {

    //Configuración de la BBDD de Dev o Testing dependiendo de las variables de Env

    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore(); // Referencia a la BBDD en Firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); // referencia al provider de Firebase auth

export {
    db, // Referencia a la base de datos
    googleAuthProvider, // refrencia a Auth Provider
    firebase //referencia a firebase
}