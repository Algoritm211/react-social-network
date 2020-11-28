import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {followAC, setCurrentPageAC, setTotalUsersCountAC, toggleIsFetchingAC} from '../../redux/users-reducer'
import {unfollowAC} from '../../redux/users-reducer'
import {setUsersAC} from '../../redux/users-reducer'
import axios from 'axios'
import Loader from '../Loader/Loader'

class UsersContainer extends React.Component {

  componentDidMount() {
    this.props.toggleIsFetching(true)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.usersPerPage}`, {
      withCredentials: true
    })
      .then(response => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(response.data.items)
        this.props.setTotalUsers(response.data.totalCount - 7899)
      })
  }

  onChangePage = (page) => {
    this.props.toggleIsFetching(true)
    this.props.setCurrentPage(page)
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.usersPerPage}`, {
      withCredentials: true
    })
      .then(response => {
        this.props.toggleIsFetching(false)
        this.props.setUsers(response.data.items)
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
    isFetching: state.usersPage.isFetching
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)