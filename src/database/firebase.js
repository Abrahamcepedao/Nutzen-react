import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/firebase-storage'

var firebaseConfig = {
    apiKey: "AIzaSyC5Tz-RZDtOoWdMWoAfqR30acgtxYTSzz8",
  authDomain: "nutzen-mx2016.firebaseapp.com",
  projectId: "nutzen-mx2016",
  storageBucket: "nutzen-mx2016.appspot.com",
  messagingSenderId: "924484679451",
  appId: "1:924484679451:web:416b0ce9c1bfde11f945be",
  measurementId: "G-92B67K9DTN"
}

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const storage = firebase.storage();
export default { firebase, db, storage };


