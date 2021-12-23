import { commonActionTypes } from "../actionTypes";

export const showInvalidLinkReducer = (state = false, { type, payload }) => {
    switch (type) {
        case commonActionTypes.INVALID_LINK:
            return payload;
        default:
            return state;
    }
};
