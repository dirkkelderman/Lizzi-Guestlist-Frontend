import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import {createBrowserHistory} from 'history';
import { CssBaseline } from "@material-ui/core";

const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
})

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Router history ={history}>
    <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
