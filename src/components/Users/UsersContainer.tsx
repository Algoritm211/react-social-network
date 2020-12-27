import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {follow, requestUsers, actions, unfollow, FilterType} from '../../redux/users-reducer'
import Loader from '../common/Loader/Loader'
import { compose } from 'redux'
import {
  getCurrentPage,
  getFilter,
  getIsFetching,
  getToggleFollowing,
  getTotalUsersCountUsers,
  getUsers,
  getUsersPerPage
} from '../../redux/users-selector'
import {UsersType} from "../../types/types";
import {AppStateType} from '../../redux/redux-store'


type UsersContainerStateProps = {
  currentPage: number,
  usersPerPage: number,
  isFetching: boolean,
  users: Array<UsersType>,
  totalUsersCount: number,
  toggleFollowing: Array<number>
  filter: FilterType
}

type UsersContainerDispatchProps = {
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
  setCurrentPage: (page: number) => void,
  getUsers: (page: number, usersPerPage: number, term: string, friend: null | boolean) => void,
  setFilterParameters: (filter: FilterType) => void
}

type PropsType = UsersContainerStateProps & UsersContainerDispatchProps

class UsersContainer extends React.Component<PropsType, never> {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.usersPerPage, this.props.filter.term, this.props.filter.friend)
  }

  onChangePage = (page: number) => {
    this.props.setCurrentPage(page)
    this.props.getUsers(page, this.props.usersPerPage, this.props.filter.term, this.props.filter.friend)
  }

  onChangeFilter = (filter: FilterType) => {
    this.props.setFilterParameters({...filter})
    this.props.setCurrentPage(1)
    this.props.getUsers(1, this.props.usersPerPage, this.props.filter.term, this.props.filter.friend)
  }
  
  render() {
    return (
      <React.Fragment>
        { this.props.isFetching
          ? <Loader />
          : null
        }
        <Users
        users={this.props.users}
        onChangePage={(page) => this.onChangePage(page)}
        totalUsersCount={this.props.totalUsersCount}
        usersPerPage={this.props.usersPerPage}
        currentPage={this.props.currentPage}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        toggleFollowing={this.props.toggleFollowing}
        onChangeFilter={this.onChangeFilter}
      />
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
    toggleFollowing: getToggleFollowing(state),
    filter: getFilter(state)
  }
}

const mapDispatchToProps: UsersContainerDispatchProps = {
    follow,
    unfollow,
    setCurrentPage: actions.setCurrentPageAC,
    getUsers: requestUsers,
    setFilterParameters: actions.setFilterParameters
}


export default connect<UsersContainerStateProps, UsersContainerDispatchProps, {}, AppStateType>(mapStateToProps, mapDispatchToProps)(UsersContainer)