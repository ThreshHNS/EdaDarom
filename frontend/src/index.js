import "core-js/features/map";
import "core-js/features/set";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import bridge from "@vkontakte/vk-bridge";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from "./App";

import userReducer from "./store/reducers/user";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

// Init VK  Mini App
bridge.send("VKWebAppInit");

ReactDOM.render(app, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
