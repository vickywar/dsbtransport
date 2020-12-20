

import {
    SET_FILTER
} from 'reduxstore/actions';

const initialState = {
    customer: [],
    driver: [],
    dateRange: [],
    otherFilters: []
}

const filters = (state=initialState, action) => {
    switch(action.type) {
        case SET_FILTER:
            return {
                ...state,
                [action.payload.filterType]: [
                    action.payload.filterSet
                ]
            }
        default:
            return state
    }
};

export default filters;