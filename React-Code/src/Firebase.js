import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDqlGawcRTPsWHGVnq1AiddcW9yeRLV5FU",
    authDomain: "chat-app-407dc.firebaseapp.com",
    databaseURL: "https://chat-app-407dc-default-rtdb.firebaseio.com",
    projectId: "chat-app-407dc",
    storageBucket: "chat-app-407dc.appspot.com",
    messagingSenderId: "1062044879463",
    appId: "1:1062044879463:web:873da15720e4289cffe2c2",
    measurementId: "G-21MV61RQQJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const database = firebase.database().ref();


export { database };
export default db;
