import { takeLatest, call, put, all } from 'redux-saga/effects';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

// logica asincrona dentro nuestra generator funcion 
export function* fetchCollectionsAsync() {
    yield console.log('I am fired');

    try {
        const collectionRef = firestore.collection('collections'); 
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot) // funcion y el parametro que recibe  
        // una vez lista, realia el dispatch con la acción que queremos 
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    // al momento de dispararse el reducer 
    // redux-saga esta escuchando que se despache esta acción y llama a nuestra generate function para realizar la tarea asíncrona
    // como una saga es un middlware que esta escuchando las acciones que se despachan, takeLatest toma la ultima que se realizó
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSaga() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}