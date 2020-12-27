import React from 'react'
import {connect} from 'react-redux';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import './App.css'
import Loader from './components/common/Loader/Loader';
// import DialogsСontainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import Music from './components/Music/Music';
import Navbar from './components/Navbar/Navbar';
import News from './components/News/News';
import ProfileContainer from './components/Profile/ProfileContainer';
import Settings from './components/Settings/Settings';

import {initializeApp} from './redux/app-reducer';
import withReactSuspense from "./components/hoc/withReactSuspense";
import UsersPage from "./components/Users/UsersContainer";

const DialogsContainer = React.lazy(() => {
  return import('./components/Dialogs/DialogsContainer')
})


type AppStateProps = {
  initialized: boolean
}

type AppDispatchProps = {
  initializeApp: () => void
}

type Props = AppStateProps & AppDispatchProps

class App extends React.Component<Props, never> {

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
          <Switch>
            <Route path="/dialogs" render={withReactSuspense(DialogsContainer)} />

            <Route path="/profile/:userId?/" render={withReactSuspense(ProfileContainer)} />

            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/users" render={() => {
              return <UsersPage />
            }} />
            <Route path="/settings" component={Settings} />
            <Route path='/login' render={() => {
              return <Login />
            }} />

            <Redirect from={'/'} to={'/profile'} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any): AppStateProps => {
  return {
    initialized: state.app.initialized
  }
}

const mapDispatchToProps: AppDispatchProps = {
  initializeApp
}


export default compose(
  withRouter,
  connect<AppStateProps, AppDispatchProps>(mapStateToProps, mapDispatchToProps)
)(App);
