

import firebasehandler from "firebaseconfig";
export const SHOW_MODAL = 'SHOW_MODAL';
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const ADDING_DETAILS = 'ADDING_DETAILS';
export const ADD_DETAILS_TEMP = 'ADD_DETAILS_TEMP';


export const showModal = (payload) => {
    return {
        type: SHOW_MODAL,
        modalState: payload.modalState,
        modalType: payload.modalType
    }
}

export const addCustomer = (payload) => {
    return {
        type: ADD_CUSTOMER,
        payload: payload,

    }
}

export const addDriver = (payload) => async dispatch => {

    const { addData, typeofadd } = payload

    dispatch({ type: ADDING_DETAILS });
    firebasehandler.firestore()
        .collection(typeofadd)
        .add(addData)
        .then((docRef) => {
            console.log(docRef);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const addDetailsTemp = (payload) => {
    return {
        type: ADD_DETAILS_TEMP,
        payload: payload,
    }
}