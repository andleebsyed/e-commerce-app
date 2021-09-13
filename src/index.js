import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { EcomProvider } from "./components/ecom-context/ecom-context";
import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from "./components/Login/Login";
import { AuthProvider } from "./contexts/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <LoginProvider>
        <EcomProvider>
          <Router>
            <App />
          </Router>
        </EcomProvider>
      </LoginProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
