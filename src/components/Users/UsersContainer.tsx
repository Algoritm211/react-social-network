import React from 'react'
import {connect, useSelector} from 'react-redux'
import Users from './Users'
import {actions, FilterType, follow, requestUsers, unfollow} from '../../redux/users-reducer'
import Loader from '../common/Loader/Loader'
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


type PropsType = {}

const UsersPage: React.FC<PropsType> = (props: PropsType) => {

  const isFetching = useSelector(getIsFetching)

  return (
    <React.Fragment>
      {isFetching
        ? <Loader/>
        : null
      }
      <Users/>
    </React.Fragment>
  )
}

export default UsersPage


