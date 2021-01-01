import React from 'react'
import {connect} from 'react-redux';
import {NavLink, Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {compose} from 'redux';
import './App.css'
import Loader from './components/common/Loader/Loader';
// import DialogsСontainer from './components/Dialogs/DialogsContainer'

import {initializeApp} from './redux/app-reducer';
import withReactSuspense from "./components/hoc/withReactSuspense";
import UsersPage from "./components/Users/UsersContainer";

import 'antd/dist/antd.css'

import {Layout, Menu, Breadcrumb} from 'antd';
import {UserOutlined, LaptopOutlined, SettingOutlined} from '@ant-design/icons';
import ProfileContainer from './components/Profile/ProfileContainer';
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import Login from './components/Login/Login';
import classes from "./components/Navbar/Navbar.module.css";
import AppHeader from "./components/Header/Header";
import ChatPage from "./components/Chat/ChatPage";

const {SubMenu} = Menu;
const {Content, Footer, Sider} = Layout;


const DialogsContainer = React.lazy(() => {
  return import('./components/Dialogs/DialogsContainer')
})

const ChatPageWithSuspense = React.lazy(() => {
  return import("./components/Chat/ChatPage")
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
      return <Loader/>
    }

    return (
      <Layout>
        <AppHeader />
        <Content style={{padding: '0 50px'}}>
          <Breadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className="site-layout-background" style={{padding: '24px 0'}}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%'}}
              >
                <SubMenu key="sub1" icon={<UserOutlined/>} title="Profile block">
                  <Menu.Item key="1">
                    <NavLink to='/profile' activeClassName={classes.activeLink}>Profile</NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<LaptopOutlined/>} title="Users block">
                  <Menu.Item key="5">
                    <NavLink to='/dialogs' activeClassName={classes.activeLink}>Messages</NavLink>
                  </Menu.Item>
                  <Menu.Item key="6">
                    <NavLink to='/chat' activeClassName={classes.activeLink}>Chat</NavLink>
                  </Menu.Item>
                  <Menu.Item key="7">
                    <NavLink to='/news' activeClassName={classes.activeLink}>News</NavLink>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <NavLink to='/music' activeClassName={classes.activeLink}>Music</NavLink>
                  </Menu.Item>
                  <Menu.Item key="9">
                    <NavLink to='/users' activeClassName={classes.activeLink}>Developers</NavLink>
                  </Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" icon={<SettingOutlined />} title="Settings block">
                  <Menu.Item key="9">
                    <NavLink to='/settings' activeClassName={classes.activeLink}>Settings</NavLink>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{padding: '0 24px', minHeight: 280}}>
              <Switch>
                <Route path="/dialogs" render={withReactSuspense(DialogsContainer)}/>

                <Route path="/profile/:userId?/" render={withReactSuspense(ProfileContainer)}/>

                <Route path="/news" component={News}/>
                <Route path="/music" component={Music}/>
                <Route path="/users" render={() => {
                  return <UsersPage/>
                }}/>
                <Route path="/settings" component={Settings}/>
                <Route path='/login' render={() => {
                  return <Login/>
                }}/>

                <Route path={'/chat'} render={withReactSuspense(ChatPageWithSuspense)} />

                <Redirect from={'/'} to={'/profile'}/>
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )

    // return (
    //   <div className="app-wrapper">
    //     <HeaderContainer />
    //     <Navbar />
    //     <div className='app-wrapper-content'>
    //       <Switch>
    //         <Route path="/dialogs" render={withReactSuspense(DialogsContainer)} />
    //
    //         <Route path="/profile/:userId?/" render={withReactSuspense(ProfileContainer)} />
    //
    //         <Route path="/news" component={News} />
    //         <Route path="/music" component={Music} />
    //         <Route path="/users" render={() => {
    //           return <UsersPage />
    //         }} />
    //         <Route path="/settings" component={Settings} />
    //         <Route path='/login' render={() => {
    //           return <Login />
    //         }} />
    //
    //         <Redirect from={'/'} to={'/profile'} />
    //       </Switch>
    //     </div>
    //   </div>
    // );
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
