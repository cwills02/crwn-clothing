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
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch(error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}
  
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

// test query example from firestore cloud database
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const firestore = firebase.firestore();

// firestore.collection('users').doc('KXKY696dcBv7emfVV5Rg').collection('cartItems').doc('1T5bXr2EGjdkrwhtkxl5');

// alternative query for specific cartItem
// firestore.doc('users/KXKY696dcBv7emfVV5Rg/cartItems/1T5bXr2EGjdkrwhtkxl5');

// collection of cartItems
// firebase.collection('/users/KXKY696dcBv7emfVV5Rg/cartItems');