import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

let dialogsData = [
  {id: 1, name: 'Alexey'},
  {id: 2, name: 'Alex'},
  {id: 3, name: 'Sabr'},
  {id: 4, name: 'Edward'},
]

let messagesData = [
  {id: 1, message: 'Hi, how are you'},
  {id: 2, message: 'Hello, do you want to drink coffee with me?'},
]

let postsData = [
  {id: 1, message: 'Hi, how are you', likesCount: 12},
  {id: 2, message: 'it`s my first post', likesCount: 15},
]

ReactDOM.render(
  <BrowserRouter>
    <App postsData={postsData} messagesData={messagesData} dialogsData={dialogsData}/>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
