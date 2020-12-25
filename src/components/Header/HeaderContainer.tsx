import React from 'react'
import Header from './Header'
import {connect} from 'react-redux'
import {logoutUser, setAuthUserData} from '../../redux/auth-reducer'
import {AppStateType} from "../../redux/redux-store";


type HeaderContainerPropsType = {
  isAuth: boolean,
  login: string | null
}

type HeaderContainerDispatchType = {
  setAuthUserData: (userId: number, email: string, login: string) => void
  logout: () => void
}


type PropsType = HeaderContainerPropsType & HeaderContainerDispatchType

class HeaderContainer extends React.Component<PropsType> {


  render() {
    return (
      <Header {...this.props} />
    )
  }
}

function mapStateToProps(state: AppStateType): HeaderContainerPropsType {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

const mapDispatchToProps: HeaderContainerDispatchType = {
  setAuthUserData,
  logout: logoutUser
}


export default connect<HeaderContainerPropsType, HeaderContainerDispatchType, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(HeaderContainer)