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
    const collectionRef = firestore.collection('users');

    const snapShot = await userRef.get();
    const collectionSnapshot = await collectionRef.get(); // QuerySnapshot 
    console.log({ collecion: collectionSnapshot.docs.map( doc => doc.data() ) });
    
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

// Function solo para subir datos a firestore de manera masiva (para no estar uno por uno)
// si falla una request deben fallar todas porque no queremos guardar solo la mitad si falla
export const  addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
};

// para traer las colleciones a ShopComponent
export const convertCollectionsSnapshotToMap = (collections)  => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();
        
        return {
            // javascript method
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items 
        }
    });
    // Forma avanzada de usar reduce
    /* pasamos un objeto como inital object y luego le vamos añadiendo las propiedades con sus correspondientes nombres: womens, jackets, hats...  */
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

export const getCurrentUser = () => {
    return new Promise(( resolve, reject ) => {
        const unsubscribe = auth.onAuthStateChanged( userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject )
    });
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider(); // google es el proveedor
googleProvider.setCustomParameters({ prompt: 'select_account' }); // google popup para seleccionar la cuenta

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;