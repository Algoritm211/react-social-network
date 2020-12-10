import React from 'react'
import {getProfile, getStatus, setUserPhoto, updateProfile, updateStatus} from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'

class ProfileContainer extends React.Component {

  refreshPage() {
    let userId = this.props.match.params.userId
    if (!userId) {
      userId = this.props.authorizedUserId
    }
    this.props.getProfile(userId)
    this.props.getStatus(userId)
  }

  componentDidMount() {
    this.refreshPage()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.refreshPage()
    }
  }

  render() {
    return (
      <Profile { ...this.props }
               isPageOwner={ !this.props.match.params.userId }
               profile={ this.props.profile }
               updateStatus={ this.props.updateStatus }/>
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
    },
    setPhoto: (photoFile) => {
      dispatch(setUserPhoto(photoFile))
    },
    updateProfile: (formData) => {
      return dispatch(updateProfile(formData))
    }
  }
}

export default compose(
              connect(mapStateToProps, mapDispatchToProps),
              withRouter,
              // withAuthRedirect,
              )(ProfileContainer)