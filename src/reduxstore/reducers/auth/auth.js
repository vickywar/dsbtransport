

import {
    GET_EMAIL,
    GET_PASSWORD,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGIN_START,
    LOGOUT_START,
    LOGOUT_FAILURE
} from 'reduxstore/actions';

const initialState = {
    email: "",
    password: "",
    isloggedin: true,
    isLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        case GET_PASSWORD:
            return {
                ...state,
                password: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isloggedin: action.payload,
                isLoading: false
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isloggedin: state.isloggedin,
                isLoading: false
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isloggedin: action.payload,
                isLoading: false
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isloggedin: action.payload,
                isLoading: false
            }
        case LOGIN_START:
        case LOGOUT_START:
            return {
                ...state,
                isLoading: true
            }

        default:
            return state
    }
}