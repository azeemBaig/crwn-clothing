import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCbo8pNeNAjq3RigROOGwbH-lxK-_2_mOg",
  authDomain: "crwn-db-40fa1.firebaseapp.com",
  databaseURL: "https://crwn-db-40fa1.firebaseio.com",
  projectId: "crwn-db-40fa1",
  storageBucket: "crwn-db-40fa1.appspot.com",
  messagingSenderId: "700434684569",
  appId: "1:700434684569:web:d814ee75ac13d8b54ef608",
  measurementId: "G-CDYFD9WTE2",
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
        ...additionalData,
      });
    } catch (error) {
        console.log('error creating user', error.message)
    }
  }

  return userRef
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
