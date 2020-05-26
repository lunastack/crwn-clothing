export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);

    // si existe simplemente sumamos
    if ( existingCartItem ) {
        // con esto logramos que el objeto item nunca se repita
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }

    // si no existe, establecemeos 1 y retornamos
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};