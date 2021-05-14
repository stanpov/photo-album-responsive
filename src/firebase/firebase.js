import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDvnRae-VkM61jfbkNBalZfxPF0rfXzZ20",
    authDomain: "photo-album-cb798.firebaseapp.com",
    databaseURL: "https://photo-album-cb798-default-rtdb.firebaseio.com",
    projectId: "photo-album-cb798",
    storageBucket: "photo-album-cb798.appspot.com",
    messagingSenderId: "184469960032",
    appId: "1:184469960032:web:193dfbc0efcb81b0269a05"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();