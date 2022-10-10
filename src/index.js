import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import USERContextProvider from "./Context/UserContext";
import NotificationProvider from "./Context/NotificationContext";
import APIContextProvider from "./Context/ApiContext";
import NewCartProvider from "./Context/NewCartContext";

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <USERContextProvider>
        <APIContextProvider>
          <NewCartProvider>
            <App />
          </NewCartProvider>
        </APIContextProvider>
      </USERContextProvider>
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
