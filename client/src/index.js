import React from "react";
import * as ReactDOMClient from "react-dom/client";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import store from "./components/store";
import { Provider } from "react-redux";

const root = ReactDOMClient.createRoot(document.getElementById("root"));
console.log("STARTING CLIENT_SIDE");

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
