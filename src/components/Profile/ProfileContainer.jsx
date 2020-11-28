import React from 'react'
import { setUserProfileAC } from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { profileAPI } from '../../api/api'

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId || 2
    profileAPI.getProfile(userId)
      .then(data => {
        this.props.setUserProfile(data)
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