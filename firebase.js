import firebase from 'firebase';
const firebaseConfig = {
  apiKey: 'AIzaSyDCHR_tjPqZnzdbeqDM_FY_HA0GPbp1nxM',
  authDomain: 'pro-f174f.firebaseapp.com',
  projectId: 'pro-f174f',
  storageBucket: 'pro-f174f.appspot.com',
  messagingSenderId: '722317989606',
  appId: '1:722317989606:web:0a92fd1d4cc5551dad0d27',
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
