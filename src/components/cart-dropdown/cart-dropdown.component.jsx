import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import './cart-dropdown.styles.scss';

/* REDUX APLICADO, RECIBIMOS CUALQUIER CAMBIO EN EL ESTADO DE ITEMS DESDE EL STORE */
const CartDropdown = ({ cartItems, history, dispatch }) => (
    <div className="  cart-dropdown">
        <div className="cart-items">
            {
                cartItems.length ? (
                    cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />)
                ) : (
                    <span className="empty-message">Tu carrito está vacío</span>)
            }
        </div>
        <CustomButton onClick={ () => { 
            history.push('/checkout');
            dispatch(toggleCartHidden())
            }}>
                GO TO CHECKOUT
        </CustomButton>
    </div>
);


const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

// con withRouter obtenemos acceso a los props enviados por el Router
export default withRouter(connect(mapStateToProps)(CartDropdown));
// si no enviamos el dispatch, connect lo pasa igualmente por los props, la razon de esto es porque si 
// tenemos acciones simples (como solo una simple accion de cambiar el estado ni recibe argumentos) 
// entonces no hay para que crear un callback para el dispatch