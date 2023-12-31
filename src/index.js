import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <DarkModeContextProvider> */}
        <App />
      {/* </DarkModeContextProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
