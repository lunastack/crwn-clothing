import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCVqKvc6spOhvs004Er1Smr7hjIvRImgYM",
    authDomain: "crwn-clothing-db-d5099.firebaseapp.com",
    databaseURL: "https://crwn-clothing-db-d5099.firebaseio.com",
    projectId: "crwn-clothing-db-d5099",
    storageBucket: "crwn-clothing-db-d5099.appspot.com",
    messagingSenderId: "699950053828",
    appId: "1:699950053828:web:20a8db32df5f89cd2a4c91",
    measurementId: "G-FMTW9K0EN8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;


    const userRef = firestore.doc(`users/${ userAuth.uid }`);

    const snapShot = await userRef.get();

    /** 
    * Si existe, retornamos la referencia al usuario
    * Si no existe la creamos e igualmente retornamos la referencia al usuario 
    */

    if (!snapShot.exists) { // si no existe el usuario en NUESTRA DB
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({ // cambiamos los datos de la referencia del usuario y cambia los almacena en firebase 
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error, error.message);
        }
    }

    return userRef; // retornamos porque aun podemos usar esta referencia despues de crear el nuevo usuario
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider(); // google es el proveedor
provider.setCustomParameters({ prompt: 'select_account' }); // google popup para seleccionar la cuenta

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;