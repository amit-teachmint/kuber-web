import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

const { TYPE } = process.env;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
    TYPE !== "PROD"
        ? createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
        : createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
