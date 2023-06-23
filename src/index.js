import React from "react";
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// TODO: Add SDKs for Firebase products that you want to use

// Firebase configuration - Public keys
const firebaseConfig = {
  apiKey: "AIzaSyAfmDVKaJNj-HqHMHq4KLoEkBdz7RmLw-w",
  authDomain: "full-stack-react-blog-app.firebaseapp.com",
  projectId: "full-stack-react-blog-app",
  storageBucket: "full-stack-react-blog-app.appspot.com",
  messagingSenderId: "506073501223",
  appId: "1:506073501223:web:996f0209e3469c31148802",
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
