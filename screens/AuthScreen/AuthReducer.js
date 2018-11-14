import {UPDATE_AUTH} from "../../redux/actions";

const initialState = {
   authData: {
       uuid: '',
       email: '',
       address: '',
       phone: ''
   }
};


export const AuthReducer = (oldState = initialState, action) => {

    const state = oldState;

    const {type, payload} = action;


    switch (type) {
        case UPDATE_AUTH: {
            return {
                ...oldState,
                authData: payload.authData,
            }
        }
        default: return state
    }

};