import { paymentActionTypes } from "../actionTypes";

export const setOrderInfo = (state = {}, { type, payload }) => {
    switch (type) {
        case paymentActionTypes.FETCH_ORDER:
            return payload;
        default:
            return state;
    }
};

export const setPGOrderInfo = (state = {}, { type, payload }) => {
    switch (type) {
        case paymentActionTypes.CREATE_PG_ORDER:
            return payload;
        default:
            return state;
    }
};

export const setPaymentInfo = (state = {}, { type, payload }) => {
    switch (type) {
        case paymentActionTypes.SET_PAYMENT_INFO:
            return payload;
        default:
            return state;
    }
};
