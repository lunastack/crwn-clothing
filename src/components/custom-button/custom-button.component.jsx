import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

// Children es el contenido dentro del boton (texto)
const CustomButton = ({children, ...props}) => (
    <CustomButtonContainer {...props}>
        {children}
    </CustomButtonContainer>
);

export default CustomButton;
