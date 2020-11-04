import { all, call } from 'redux-saga/effects';

import { shopSaga } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';


export default function* rootSaga() {
    // si tuvieramos mas sagas tendriamos que tener 3 yields llamandolas, lo cual no seria concurrente
    // all - call, llamar a todas las sagas
    // en sagaMiddleware.run(), en vez de tener solo unas saga tendremos un rootSaga que contiene todas las sagas
    yield all([
        call( shopSaga ),
        call( userSagas ),
        call( cartSagas )
    ]);
}