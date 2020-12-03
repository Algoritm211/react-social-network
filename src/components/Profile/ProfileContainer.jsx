import React from 'react'
import { getProfile, getStatus, updateStatus } from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

  componentDidMount() {
    let userId = this.props.match.params.userId 
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} updateStatus={this.props.updateStatus}/>
    )
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth 
  }
} 

function mapDispatchToProps(dispatch) {
  return {
    getProfile: (profile) => {
      dispatch(getProfile(profile))
    },
    getStatus: (userId) => {
      dispatch(getStatus(userId))
    },
    updateStatus: (status) => {
      dispatch(updateStatus(status))
    }
  }
}

export default compose(
              connect(mapStateToProps, mapDispatchToProps),
              withRouter,
              // withAuthRedirect,
              )(ProfileContainer)