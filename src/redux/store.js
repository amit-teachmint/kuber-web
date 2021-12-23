import { createStore } from "redux";
import rootReducer from "./reducers/index";

const { TYPE } = process.env;

const store =
    TYPE !== "PROD"
        ? createStore(
              rootReducer,
              window.__REDUX_DEVTOOLS_EXTENSION__ &&
                  window.__REDUX_DEVTOOLS_EXTENSION__()
          )
        : createStore(rootReducer);

export default store;
