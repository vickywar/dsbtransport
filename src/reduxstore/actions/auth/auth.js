

import firebaseHandler from 'firebaseconfig';

export const GET_EMAIL = 'GET_EMAIL';
export const GET_PASSWORD = 'GET_PASSWORD';
export const LOGIN_SUCCESS = 'LOGIN_SUCESS';
export const LOGIN_START = 'LOGIN_START';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_SUCCESS';

export const getEmail = (payload) => {
    return {
        type: GET_EMAIL,
        payload
    }
};

export const getPassword = (payload) => {
    return {
        type: GET_PASSWORD,
        payload
    }
};

export const loginstart = () => {
    return {
        type: LOGIN_START
    }
}   

export const logoutstart = () => {
    return {
        type: LOGOUT_START
    }
}

export const signInFunc = (email, password) => async dispatch => {
    dispatch(loginstart());
    try {
        firebaseHandler
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((user) => {
                console.log(user);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: true
                });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: LOGIN_FAILURE,
                    payload: false
                });
            });
    } catch (err) {
        console.log("Catch Block");
        console.log(err);
        dispatch({
            type: LOGIN_FAILURE,
            payload: false
        });
    }
};

export const checkLogin = () => async dispatch => {
    dispatch(loginstart());
    try {
        firebaseHandler
            .auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user);
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: true
                    });
                } else {
                    dispatch({
                        type: LOGIN_FAILURE,
                        payload: false
                    });
                }
            });
    } catch (err) {
        console.log(err);
        dispatch({
            type: LOGIN_FAILURE,
            payload: false
        });
    }
};

export const userLogout = () => async dispatch => {
    dispatch(logoutstart());
    try {
        firebaseHandler
        .auth()
        .signOut()
        .then(() => {
            dispatch({
                type: LOGOUT_SUCCESS,
                payload: false
            });
        })
        .catch((err) => {
            console.log(`LOGOUT FAILED ${err}`)
            dispatch({
                type: LOGOUT_FAILURE,
            });
        })
    } catch (err) {
        console.log(`LOGOUT FAILED ${err}`)
        dispatch({
            type: LOGOUT_FAILURE,
        });
    }
}