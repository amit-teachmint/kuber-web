import { commonActionTypes } from "../actionTypes";

export const showErrorReducer = (
    state = { showError: false, msg: "", ERROR_CODE: "" },
    { type, payload }
) => {
    switch (type) {
        case commonActionTypes.SHOW_ERROR:
            return payload;
        default:
            return state;
    }
};
