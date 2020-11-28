import React from 'react'
import Header from './Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { setAuthUserDataAC } from '../../redux/auth-reducer'

class HeaderContainer extends React.Component {

  componentDidMount() {
    axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
      withCredentials: true,
    })
      .then(response => {
        if (response.data.resultCode === 0) {
          let {id, email, login} = response.data.data
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