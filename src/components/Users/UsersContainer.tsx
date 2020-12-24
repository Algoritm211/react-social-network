import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {follow, requestUsers, actions, unfollow} from '../../redux/users-reducer'
import Loader from '../common/Loader/Loader'
import { compose } from 'redux'
import { getCurrentPage, getIsFetching, getToggleFollowing, getTotalUsersCountUsers, getUsers, getUsersPerPage } from '../../redux/users-selector'
import {UsersType} from "../../types/types";
import {AppStateType} from '../../redux/redux-store'


type UsersContainerStateProps = {
  currentPage: number,
  usersPerPage: number,
  isFetching: boolean,
  users: Array<UsersType>,
  totalUsersCount: number,
  toggleFollowing: Array<number>
}

type UsersContainerDispatchProps = {
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  setCurrentPage: (page: number) => void,
  getUsers: (page: number, usersPerPage: number) => void,
}

type PropsType = UsersContainerStateProps & UsersContainerDispatchProps

class UsersContainer extends React.Component<PropsType, never> {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.usersPerPage)
  }

  onChangePage = (page: number) => {
    this.props.setCurrentPage(page)
    this.props.getUsers(page, this.props.usersPerPage)
  }
  
  render() {
    return (
      <React.Fragment>
        { this.props.isFetching
          ? <Loader />
          : <Users 
          users={this.props.users} 
          onChangePage={(page) => this.onChangePage(page)}
          totalUsersCount={this.props.totalUsersCount}
          usersPerPage={this.props.usersPerPage}
          currentPage={this.props.currentPage}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          toggleFollowing={this.props.toggleFollowing}
          />
        }
      </React.Fragment>
    )
  }
}


function mapStateToProps(state: AppStateType): UsersContainerStateProps {
  return {
    users: getUsers(state),
    usersPerPage: getUsersPerPage(state),
    totalUsersCount: getTotalUsersCountUsers(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    toggleFollowing: getToggleFollowing(state) 
  }
}

const mapDispatchToProps: UsersContainerDispatchProps = {
    follow,
    unfollow,
    setCurrentPage: actions.setCurrentPageAC,
    getUsers: requestUsers,
}


export default connect<UsersContainerStateProps, UsersContainerDispatchProps, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer)