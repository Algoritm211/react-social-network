import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { logoutUser, setAuthUserData } from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <Header {...this.props} />
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setAuthUserData: (userId, email, login) => {
      dispatch(setAuthUserData(userId, email, login))
    },
    logout: () => {
      dispatch(logoutUser())
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer) 