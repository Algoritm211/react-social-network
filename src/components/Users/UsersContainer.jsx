import React from 'react'
import { connect } from 'react-redux'
import Users from './Users'
import {followAC} from '../../redux/users-reducer'
import {unfollowAC} from '../../redux/users-reducer'
import {setUsersAC} from '../../redux/users-reducer'

function mapStateToProps(state) {
  return {
    users: state.usersPage.users
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
    }
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)

export default UsersContainer