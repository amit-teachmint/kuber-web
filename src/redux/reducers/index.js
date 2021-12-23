import { combineReducers } from "redux";
import { showInvalidLinkReducer } from "./commonReducers";

const rootReducer = combineReducers({
    showInvalidLink: showInvalidLinkReducer,
});

export default rootReducer;
