import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

/* Recordatorio: los reducer son las funciones que retornan en el state
    Cuando se inicializa la aplicación es que le da el valor inicial al state */
export default combineReducers({
    user: userReducer,
    cart: cartReducer
});