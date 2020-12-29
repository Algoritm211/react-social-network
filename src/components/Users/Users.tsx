import React, {useEffect} from 'react'
import classes from './Users.module.css'
import Paginator from '../common/Paginator/Paginator'
import User from './User/User'
import {UsersType} from "../../types/types";
import SearchUserForm from './SearchUserForm/SearchUserForm';
import {actions, FilterType, follow, requestUsers, unfollow} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
  getCurrentPage,
  getFilter,
  getToggleFollowing,
  getTotalUsersCountUsers,
  getUsers,
  getUsersPerPage
} from "../../redux/users-selector";
import { useHistory } from 'react-router-dom';
import {BooleanParam, NumberParam, StringParam, useQueryParams, decodeString } from 'use-query-params';


type Props = {}

const Users: React.FC<Props> = () => {

  const dispatch = useDispatch()

  const currentPage = useSelector(getCurrentPage)
  const usersPerPage = useSelector(getUsersPerPage)
  const totalUsersCount = useSelector(getTotalUsersCountUsers)
  const users = useSelector(getUsers)
  const toggleFollowing = useSelector(getToggleFollowing)
  const filter  = useSelector(getFilter)

  const [query, setQuery] = useQueryParams({term: StringParam, friend: BooleanParam, page: NumberParam});


  useEffect(() => {

    const queryParams = query
    const page = queryParams.page || 1
    const term = queryParams.term  || ''
    const friend = queryParams.friend === undefined ? null : queryParams.friend
    dispatch(actions.setCurrentPageAC(page))
    dispatch(requestUsers(page, usersPerPage, term, friend))
  }, [])


  useEffect(() => {
    setQuery({...filter, page: currentPage})
  }, [filter, currentPage])



  const onChangePage = (page: number) => {
    dispatch(actions.setCurrentPageAC(page))
    dispatch(requestUsers(page, usersPerPage, filter.term, filter.friend))
  }

  const onChangeFilter = (filter: FilterType) => {
    dispatch(actions.setFilterParameters({...filter}))
    dispatch(actions.setCurrentPageAC(1))
    dispatch(requestUsers(1, usersPerPage, filter.term, filter.friend))
  }

  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
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
      <div>
        <SearchUserForm onChangeFilter={onChangeFilter} />
      </div>
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