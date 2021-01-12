import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD5XLhOSJPv_1dxmKH0YUTbBQDtoAAimU0",
    authDomain: "crwn-db-ce06e.firebaseapp.com",
    projectId: "crwn-db-ce06e",
    storageBucket: "crwn-db-ce06e.appspot.com",
    messagingSenderId: "1068665681164",
    appId: "1:1068665681164:web:377c86dea5ea11af63c529",
    measurementId: "G-DLSCZJS99Y"
}
  
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;