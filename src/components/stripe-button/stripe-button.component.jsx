import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe =  price * 100;
    const publishableKey = 'pk_test_fCMhvGl6XN07TH2azgQWH3HB00hfJjYA8I';

    const onToken = token => {
        console.timeLog(token);
        alert('Pago realizado con éxito');
    }

    return (
        <StripeCheckout  
            label='Pagar Ahora'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`El total es: ${price}`}
            amount={priceForStripe}
            panelLabel='Pagar Ahora'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;