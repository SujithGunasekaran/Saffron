import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCycK_XKx90kg8EEEVaXHcbJsFtMGgBjtk",
    authDomain: "image-gallery-973de.firebaseapp.com",
    projectId: "image-gallery-973de",
    storageBucket: "image-gallery-973de.appspot.com",
    messagingSenderId: "862862841325",
    appId: "1:862862841325:web:b46ab6347417603db543e4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const galleryStorage = firebase.storage();
const galleryFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { galleryStorage, galleryFireStore, timestamp }
