import React from 'react'
import Header from './Header'
import { connect } from 'react-redux'
import { setAuthUserDataAC } from '../../redux/auth-reducer'
import { authAPI } from '../../api/api'

class HeaderContainer extends React.Component {

  componentDidMount() {
    authAPI.authUser()
      .then(data => {
        if (data.resultCode === 0) {
          let {id, email, login} = data.data
          this.props.setAuthUserData(id, email, login)
        }
      })
  }

  render() {
    return (
      <Header {...this.props}/>
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
      dispatch(setAuthUserDataAC(userId, email, login))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer) 