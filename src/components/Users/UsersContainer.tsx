import React from 'react'
import {useSelector} from 'react-redux'
import Users from './Users'
import Loader from '../common/Loader/Loader'
import {getIsFetching} from '../../redux/users-selector'


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


