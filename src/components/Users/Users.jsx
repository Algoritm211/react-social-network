import React from 'react'
import classes from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'

const Users = (props) => {
  
  const follow = (userId) => {
    props.follow(userId)
  }

  const unfollow = (userId) => {
    props.unfollow(userId)
  }

  let usersElements = props.users.map((user, index) => {
    return (
      <User
          key={user.name + index}
          user = {user}
          toggleFollowing = {props.toggleFollowing}
          unfollow = {unfollow}
          follow = {follow}
          />
    )
  })

  return (
    <React.Fragment>
      <div className={classes.paginator}>
        <Paginator 
          totalItemsCount = {props.totalUsersCount}
          currentPage = {props.currentPage}
          usersPerPage = {props.usersPerPage} 
          onChangePage = {props.onChangePage}/>
      </div>
      <div>
        {usersElements}
      </div>
    </React.Fragment>
  )
}

export default Users