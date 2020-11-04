import { createSelector } from 'reselect';
/*=======================================================================================================*/
// INPUT SELECTORS
/*=======================================================================================================*/
// memoriza el objeto que va a ocupar
const selectCart = state =>  state.cart;  

/*=======================================================================================================*/
// OUTPUT SELECTOR
/*=======================================================================================================*/
// hey, seleccioname el estado cart y retorna cart.cartItems
export const selectCartItems = createSelector(
    [selectCart], // trabajará en base a lo que devuelva el input selector selectCart --> state.cart
    cart => cart.cartItems // retornara el subconjunto state.cart.cartItems en base al input selector selectCart
);

export const selectCartHidden = createSelector(
    [selectCart],
    cart => cart.hidden
);

// no se vuelve a calcular si los valores son los mismos, retorna el valor memorizado (cache )
export const selectCartItemsCount = createSelector(
    [selectCartItems], // trabajará en base a state.cart.cartItems
    // retornará la suma de las quantitys
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => 
            accumulatedQuantity + cartItem.quantity, 
        0
    )
);  

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce(
        (accumulatedQuantity, cartItem) => 
            accumulatedQuantity + (cartItem.quantity  * cartItem.price), 
        0
    )
);
