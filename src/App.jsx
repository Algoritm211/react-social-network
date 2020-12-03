import React from 'react'
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import './App.css'
import Loader from './components/common/Loader/Loader';
import Dialogs from './components/Dialogs/Dialogs';
import DialogsСontainer from './components/Dialogs/DialogsContainer'
import Header from './components/Header/Header';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import { initializeApp } from './redux/app-reducer';


class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }


  render() {
    if (!this.props.initialized) {
      return <Loader />
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path="/dialogs" render={() => {
            return (
              <DialogsСontainer />
            )
          }} />
          <Route path="/profile/:userId?/" render={() => {
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
          <Route path='/login' render={() => {
            return <Login />
          }} />
        </div>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    initialized: state.app.initialized
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initializeApp: () => {
      dispatch(initializeApp())
    }
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App);
