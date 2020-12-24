import React from 'react'
import {getProfile, getStatus, setUserPhoto, updateProfile, updateStatus} from '../../redux/profile-reducer'
import Profile from './Profile'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
//import withAuthRedirect from '../hoc/withAuthRedirect'
import { compose } from 'redux'
import {ProfileType, StatusType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";

type ProfileStateProps = {
  profile: ProfileType | null
  status: StatusType['status'],
  statusUpdateError: StatusType['errorMessage'],
  authorizedUserId: number | null,
  isAuth: boolean,
}

type ProfileDispatchProps = {
  getProfile: (userId: number) => void,
  getStatus: (userId: number) => void,
  updateStatus: (status: string) => void,
  setUserPhoto: (photoFile: File) => void,
  updateProfile: (userData: any) => Promise<any>,
}

type ProfileOwnProps = {
  match: any
}

type Props = ProfileDispatchProps & ProfileStateProps & ProfileOwnProps

class ProfileContainer extends React.Component<Props, never> {

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

  componentDidUpdate(prevProps: Props) {
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

const mapStateToProps = (state: any): ProfileStateProps => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.statusField.status,
    statusUpdateError: state.profilePage.statusField.errorMessage,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth 
  }
}



const mapDispatchToProps = {
  getProfile,
  getStatus,
  updateStatus,
  setUserPhoto,
  updateProfile,
}

export default compose<React.ComponentType>(
              connect(mapStateToProps, mapDispatchToProps),
              withRouter,
              // withAuthRedirect,
              )(ProfileContainer)