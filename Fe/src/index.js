import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/authContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./styles/base.scss";
import { Provider } from "react-redux";
import store from "./app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <AuthContextProvider>
          <App />
          <ToastContainer />
        </AuthContextProvider>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
