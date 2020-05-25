import { UserActionsTypes} from './user.types';

//parecido setState de React 
export const setCurrentUser = user => ({
    type: UserActionsTypes.SET_CURRENT_USER,
    payload: user  
});