import { combineReducers } from 'redux';
import {AuthReducer} from '../screens/AuthScreen/AuthReducer';


const CombinedReducers = combineReducers({
    authReducer: AuthReducer,

});

export default CombinedReducers;