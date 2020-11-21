import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/state';

// addPost('I will own Rolls-Royce')
let rerenderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter>
      <App 
        state={store.getState()} 
        addPost={store.addPost.bind(store)}
        updateNewPostText={store.updateNewPostText.bind(store)}
        />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
