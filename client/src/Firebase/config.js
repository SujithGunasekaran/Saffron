import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

var firebaseConfig = { '<<<<<<<<< Add your Firebase config >>>>>>>>>>' };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const galleryStorage = firebase.storage();
const galleryFireStore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { galleryStorage, galleryFireStore, timestamp }
