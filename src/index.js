import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import store from './redux/redux-store';
//import StoreContext, { StoreProvider } from './StoreContext';
import {Provider} from 'react-redux'

// addPost('I will own Rolls-Royce')
// Include HashRouter for GitHub pages
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root'));


// store.subscribe(() => {
//   let state = store.getState()
//   rerenderEntireTree(state)
// })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
