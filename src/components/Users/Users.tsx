import React from 'react'
import classes from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import {ProfileType, UsersType} from "../../types/types";


type Props = {
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
    users: Array<UsersType>,
    toggleFollowing: Array<number>
    totalUsersCount: number,
    currentPage: number,
    usersPerPage: number,
    onChangePage: (page: number) => void
}

const Users: React.FC<Props> = ({follow, unfollow, users,
                                    totalUsersCount,
                                    currentPage,
                                    usersPerPage,
                                    onChangePage,
                                    toggleFollowing}) => {
  
  const followUser = (userId: number) => {
    follow(userId)
  }

  const unfollowUser = (userId: number) => {
    unfollow(userId)
  }

  let usersElements = users.map((user: UsersType, index: number) => {
    return (
      <User
          key={user.name + index}
          user = {user}
          toggleFollowing = {toggleFollowing}
          unfollow = {unfollowUser}
          follow = {followUser}
          />
    )
  })

  return (
    <React.Fragment>
      <div className={classes.paginator}>
        <Paginator 
          totalItemsCount = {totalUsersCount}
          currentPage = {currentPage}
          usersPerPage = {usersPerPage}
          onChangePage = {onChangePage}/>
      </div>
      <div>
        {usersElements}
      </div>
    </React.Fragment>
  )
}

export default Users