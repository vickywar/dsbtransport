

import {
    SHOW_MODAL,
    ADD_CUSTOMER,
    ADD_DETAILS_TEMP
} from 'reduxstore/actions';

// const initialState = {
//     addingType: {
//         modalType: "",
//         shouldShowModal: false
//     },
//     customer: [],
//     transactions: [{}],
//     driver: [
//         {
//             driverName: "",
//             vehicles: []
//         }
//     ]
// };

const initialState = {
    addingType: {
        modalType: "",
        shouldShowModal: false
    },
    customer: [],
    driver: [],
    transaction: [],
};

const getdetails = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                addingType: {
                    ...state.addingType,
                    modalType: action.modalType,
                    shouldShowModal: action.modalState
                }
            }
        case ADD_CUSTOMER:
            return {
                ...state,
                ...state.addingType,
                customer: action.payload.customer,
                driver: action.payload.driver,
                transaction: action.payload.transaction,
            }
        case ADD_DETAILS_TEMP:
            return {
                ...state,
                [action.payload.typeofadd]: [
                    ...state[action.payload.typeofadd],
                    action.payload.addData
                ]
            }
        default:
            return state;
    }
};

export default getdetails;


