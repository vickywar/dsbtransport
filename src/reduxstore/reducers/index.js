

import { combineReducers } from 'redux';
import auth from './auth/auth';
import adddetails from './getdetails/getdetails';
import filters from './filters/filters';

export default combineReducers({
    auth,
    filters,
    adddetails
});