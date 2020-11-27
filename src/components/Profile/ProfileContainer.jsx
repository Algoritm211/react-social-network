import React from 'react'
import { setUserProfileAC } from '../../redux/profile-reducer'
import Profile from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId || 2
    axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
      .then(response => {
        this.props.setUserProfile(response.data)
      })
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profilePage.profile,
    isFetching: state.profilePage.isFetching
  }
} 

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (profile) => {
      dispatch(setUserProfileAC(profile))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer))