import CartActionsTypes from './cart.types';


const INITIAL_STATE = {
    hidden: true
};

const cartReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionsTypes.TOGGLE_CART_HIDDEN:
            console.log('cart reducer', {...state})
            return {
                ...state,
                hidden: !state.hidden
            }
        default: 
            return state;
    }
    
}

export default cartReducer;