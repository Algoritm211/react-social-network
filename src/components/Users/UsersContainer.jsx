import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {followAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC, toggleIsFollowingAC} from '../../redux/users-reducer'
import {unfollowAC} from '../../redux/users-reducer'
import {setUsersAC} from '../../redux/users-reducer'
import {usersAPI} from '../../api/api'
import Loader from '../Loader/Loader'

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true)
    usersAPI.getUsers(this.props.currentPage, this.props.usersPerPage)
      .then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
        this.props.setTotalUsers(data.totalCount - 7899)
      })
  }

  onChangePage = (page) => {
    this.props.toggleIsFetching(true)
    this.props.setCurrentPage(page)
    usersAPI.getUsers(page, this.props.usersPerPage)
      .then(data => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(data.items)
      })
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
          toggleIsFollowing={this.props.toggleIsFollowing} //function
          />
        }
      </React.Fragment>
    )
  }
}


function mapStateToProps(state) {
  return {
    users: state.usersPage.users,
    usersPerPage: state.usersPage.usersPerPage,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    toggleFollowing: state.usersPage.toggleFollowing 
  }
}

function mapDispatchToProps(dispatch) {
  return {
    follow: (userId) => {
      dispatch(followAC(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollowAC(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersAC(users))
    },
    setTotalUsers: (count) => {
      dispatch(setTotalUsersCountAC(count))
    },
    setCurrentPage: (page) => {
      dispatch(setCurrentPageAC(page))
    },
    toggleIsFetching: (isFetching) => {
      dispatch(toggleIsFetchingAC(isFetching))
    },
    toggleIsFollowing: (isToglleFollowing, userId) => {
      dispatch(toggleIsFollowingAC(isToglleFollowing, userId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)