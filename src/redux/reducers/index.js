import { combineReducers } from "redux";
import { showErrorReducer } from "./commonReducers";
import {
    setOrderInfo,
    setPaymentInfo,
    setPGOrderInfo,
} from "./paymentReducers";

const rootReducer = combineReducers({
    showError: showErrorReducer,
    orderInfo: setOrderInfo,
    pgOrderInfo: setPGOrderInfo,
    paymentInfo: setPaymentInfo,
});

export default rootReducer;
