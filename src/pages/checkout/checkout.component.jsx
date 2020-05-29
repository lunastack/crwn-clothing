import React from 'react';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component'; 

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, totalValue }) => (
    <div className='checkout-page'>
        <div className="checkout-header">
            <div className="header-block">
                <span>Producto</span>
            </div>
            <div className="header-block">
                <span>Descripción</span>
            </div>
            <div className="header-block">
                <span>Cantidad</span>
            </div>
            <div className="header-block">
                <span>Precio</span>
            </div>
            <div className="header-block">
                <span>Eliminar</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={ cartItem } />
            )
        }
        <div className="total">
            <span>Total: ${totalValue}</span>
        </div>
        <div className="test-warning">
            *Porfavor usa la siguiente tarjeta de credito de prueba para los pagos*
            <br/>
            4242 4242 4242 4242 - Exp: 01/20 - CVV: 123
        </div>
        <StripeCheckoutButton price={totalValue}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalValue: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);