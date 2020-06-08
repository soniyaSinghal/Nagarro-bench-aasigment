import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Router } from "react-router-dom";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";
import { createBrowserHistory } from "history";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./index.css";
import "assets/style/combined.scss";

export const appHistory = createBrowserHistory();

const store = configureStore();
render(
  <ReduxProvider store={store}>
    <Router history={appHistory}>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("root")
);
