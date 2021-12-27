import axios from "axios";
// import { api } from "../constants";
// import { api, BACKEND_HEADERS } from "../constants";
import {
    fetchOrderAction,
    fetchPaymentAction,
} from "../redux/actions/paymentActions";
import { showErrorAction } from "../redux/actions/commonAction";

const BACKEND_HEADERS = {
    Accept: "application/json",
};
const api = "http://localhost:5000/";

/**
 *  fetch order
 */
export const utilsFetchOrder = (orderId) => {
    return async (dispatch) => {
        await axios({
            method: "GET",
            url: `${api}order/${orderId}`,
            headers: BACKEND_HEADERS,
        })
            .then((response) => {
                if (response && response.data && response.data.status)
                    dispatch(fetchOrderAction(response.data.obj));
                else
                    dispatch(
                        showErrorAction({
                            showError: true,
                            msg: response.data.msg,
                            ERROR_CODE: response.data.ERROR_CODE,
                        })
                    );
            })
            .catch(() =>
                dispatch(
                    showErrorAction({
                        showError: true,
                        msg: "Some thing went wrong",
                        ERROR_CODE: "",
                    })
                )
            );
    };
};

/**
 *  initiate payment
 */
export const utilsInitiatePayment = (e, orderId) => {
    return async (dispatch) => {
        await axios({
            method: "POST",
            url: `${api}pg-order/${orderId}`,
            headers: BACKEND_HEADERS,
        })
            .then((response) => {
                if (response && response.data && response.data.status) {
                    const pgOrder = response.data.obj;
                    var options = {
                        key: "rzp_live_j7Q8JmEgt8bCDh",
                        amount: pgOrder.amount_due,
                        currency: pgOrder.currency,
                        name: pgOrder.name,
                        description: pgOrder.description,
                        image: pgOrder.image,
                        order_id: pgOrder.id,
                        handler: function (response) {
                            console.log(response);
                            dispatch(utilPostPayment(orderId, response));
                        },
                        // prefill: {
                        //     name: "Suraj Yadav",
                        //     email: "suraj.yadav@teachmint.com",
                        //     contact: "7054123127",
                        // },
                    };

                    var razorpay = new window.Razorpay(options);
                    razorpay.on("payment.failed", function (response) {
                        console.log(response.error);
                        dispatch(utilPostPayment(orderId, response));
                    });

                    razorpay.open();
                    e.preventDefault();
                } else
                    dispatch(
                        showErrorAction({
                            showError: true,
                            msg: response.data.msg,
                            ERROR_CODE: response.data.ERROR_CODE,
                        })
                    );
            })
            .catch(() =>
                dispatch(
                    showErrorAction({
                        showError: true,
                        msg: "Some thing went wrong",
                        ERROR_CODE: "",
                    })
                )
            );
    };
};

/**
 *  post payment
 */
export const utilPostPayment = (orderId, paymentResponse) => {
    return async (dispatch) => {
        // const fd = new FormData();
        // for (var key in paymentResponse) {
        //     fd.append(key, paymentResponse[key]);
        // }
        paymentResponse = { ...paymentResponse, mode_of_payment: "pg" };

        await axios({
            method: "POST",
            url: `${api}payment/${orderId}`,
            headers: BACKEND_HEADERS,
            data: paymentResponse,
        })
            .then((response) => {
                if (response && response.data && response.data.status) {
                    console.log("%%%%%%%%%%%%%%%%", response.data.obj);
                    dispatch(fetchOrderAction(response.data.obj));
                } else
                    dispatch(
                        showErrorAction({
                            showError: true,
                            msg: response.data.msg,
                            ERROR_CODE: response.data.ERROR_CODE,
                        })
                    );
            })
            .catch(() =>
                dispatch(
                    showErrorAction({
                        showError: true,
                        msg: "Some thing went wrong",
                        ERROR_CODE: "",
                    })
                )
            );
    };
};
