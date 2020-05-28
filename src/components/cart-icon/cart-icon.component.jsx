import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'; 
import { createStructuredSelector } from 'reselect';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
    console.log('renderizando cart-icon and props: ', itemCount)
    return (
        <div className="cart-icon" onClick={toggleCartHidden} >
            <ShoppingIcon className='shopping-icon' />
            <span className="item-count">{itemCount}</span>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden()) // le pasa de innmediato el objeto al dispatch
});

// si cambia el user, entonces este comoponente no volverá a renderizarse ( ver colo chrome )
// la idea es no volver a hacer la operacion de conteo si itemState es el mismo
const mapStateToProps = createStructuredSelector ({
    itemCount: selectCartItemsCount

    // ocupamos el cartItems para el span, pero si lo ocuparamos para renderizar otras cosas que no afectan a ese label, entonces es
    // cuando reselect nos facilita la vida, teniendo un codigo mas mantenible y reutilizable, generando rendimiento
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);