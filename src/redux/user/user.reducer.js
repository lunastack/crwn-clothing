import { UserActionsTypes} from './user.types';

const INITIAL_STATE = {
    currentUser: null
}

const userReducer = (state=INITIAL_STATE, action) => { // cuando se inicalize la aplicación, se asiganra el INITIAL_STATE
    switch(action.type) {
        case UserActionsTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        default: 
            //si la accion no coincide con ninguna de las acciones que se especifican, entonces retorna el mismo estado
            return state;
    }
};

export default userReducer;