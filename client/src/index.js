import React from "react";
import ReactDom from "react-dom";
import App from "./app/App";
import "./index.scss";
import { createStore } from "redux";
import reducers from "./reducers/reducer";
import { Provider } from "react-redux";
import "bulma/css/bulma.min.css";
import { UserProvider, Web3Provider } from "./provider";

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDom.render(
  <Web3Provider>
    <UserProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </UserProvider>
  </Web3Provider>,
  document.getElementById("root")
);
