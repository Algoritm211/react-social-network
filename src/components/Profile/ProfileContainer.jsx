import React from 'react'
import { getProfile, setUserProfileAC } from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthRedirect from '../hoc/withAuthRedirect'

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId || 2
    this.props.getProfile(userId)
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
    isFetching: state.profilePage.isFetching,
  }
} 

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (profile) => {
      dispatch(getProfile(profile))
    }
  }
}

export default withAuthRedirect(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)))