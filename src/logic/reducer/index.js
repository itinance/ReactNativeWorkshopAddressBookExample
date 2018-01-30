import { combineReducers } from 'redux';
import AddressReducer from './AddressReducer';

export default combineReducers({
    addressView: AddressReducer
});