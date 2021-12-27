import { paymentActionTypes } from "../actionTypes";

export const fetchOrderAction = (flag) => {
    return {
        type: paymentActionTypes.FETCH_ORDER,
        payload: flag,
    };
};

export const createPGOrderAction = (flag) => {
    return {
        type: paymentActionTypes.CREATE_PG_ORDER,
        payload: flag,
    };
};

export const fetchPaymentAction = (flag) => {
    return {
        type: paymentActionTypes.SET_PAYMENT_INFO,
        payload: flag,
    };
};
