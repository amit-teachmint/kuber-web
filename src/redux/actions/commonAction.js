import { commonActionTypes } from "../actionTypes";

export const showInvalidLink = (flag) => {
    return {
        type: commonActionTypes.INVALID_LINK,
        payload: flag,
    };
};
