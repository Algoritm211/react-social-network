import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import Dialogs from './components/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';

function App(props) {

  return (
    <div className="app-wrapper">
      <Header />
      <Navbar state={props.state.sidebar}/>
      <div className='app-wrapper-content'>
        <Route path="/dialogs" render={() => {
          return (
            <Dialogs state={props.state.dialogsPage}/>
          )
        }} />
        <Route path="/profile" render={() => {
          return (
            <Profile state={props.state.profilePage}
                    addPost={props.addPost}
            />
          )
        }} />

        <Route path="/news" component={News} />
        <Route path="/music" component={Music} />
        <Route path="/settings" component={Settings} />
      </div>
    </div>
  );
}

export default App;
