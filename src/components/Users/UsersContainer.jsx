import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {follow, requestUsers, setCurrentPageAC, unfollow} from '../../redux/users-reducer'
import Loader from '../common/Loader/Loader'
import { compose } from 'redux'
import { getCurrentPage, getIsFetching, getToggleFollowing, getTotalUsersCountUsers, getUsers, getUsersPerPage } from '../../redux/users-selector'

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.usersPerPage)
  }

  onChangePage = (page) => {
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


function mapStateToProps(state) {
  return {
    users: getUsers(state),
    usersPerPage: getUsersPerPage(state),
    totalUsersCount: getTotalUsersCountUsers(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    toggleFollowing: getToggleFollowing(state) 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    follow: (userId) => {
      dispatch(follow(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollow(userId))
    },
    setCurrentPage: (page) => {
      dispatch(setCurrentPageAC(page))
    },
    getUsers: (currentPage, usersPerPage) => {
      dispatch(requestUsers(currentPage, usersPerPage))
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(UsersContainer)