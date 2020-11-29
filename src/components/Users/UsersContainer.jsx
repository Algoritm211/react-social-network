import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {follow, getUsers, setCurrentPageAC, unfollow} from '../../redux/users-reducer'
import Loader from '../Loader/Loader'
import withAuthRedirect from '../hoc/withAuthRedirect'

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
      dispatch(follow(userId))
    },
    unfollow: (userId) => {
      dispatch(unfollow(userId))
    },
    setCurrentPage: (page) => {
      dispatch(setCurrentPageAC(page))
    },
    getUsers: (currentPage, usersPerPage) => {
      dispatch(getUsers(currentPage, usersPerPage))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)