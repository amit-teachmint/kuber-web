import { commonActionTypes } from "../actionTypes";

export const showErrorAction = (flag) => {
    return {
        type: commonActionTypes.SHOW_ERROR,
        payload: flag,
    };
};

// export const setErrorObjectAction = (flag) => {
//     return {
//         type: commonActionTypes.SET_ERROR_OBJECT,
//         payload: flag,
//     };
// };
