
export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    );

    // si existe simplemente sumamos
    if (existingCartItem) {
        // con esto logramos que el objeto item nunca se repita
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    // si no existe, establecemeos 1 y retornamos
    return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToRemove.id
    );

    if ( existingCartItem.quantity === 1) {
        // devolverá todos menos el item a remover
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id )
    }

    // si no es uno lo disminuimos
    return cartItems.map( cartItem => 
        cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    )
}