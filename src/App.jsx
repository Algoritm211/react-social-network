import React from 'react'
import { Route } from 'react-router-dom';
import './App.css'
import Dialogs from './components/Dialogs/Dialogs';
import DialogsСontainer from './components/Dialogs/DialogsContainer'
import Header from './components/Header/Header';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';


function App(props) {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Route path="/dialogs" render={() => {
          return (
            <DialogsСontainer />
          )
        }} />
        <Route path="/profile" render={() => {
          return (
            <ProfileContainer />
          )
        }} />

        <Route path="/news" component={News} />
        <Route path="/music" component={Music} />
        <Route path="/users" render={() => {
          return <UsersContainer />
        }} />
        <Route path="/settings" component={Settings} />
      </div>
    </div>
  );
}

export default App;
