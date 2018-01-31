import { combineReducers } from 'redux';
import AddressReducer from './AddressReducer';
import ErrorReducer from './ErrorReducer';


export default combineReducers({
    addressView: AddressReducer,
    globalError: ErrorReducer,
});