import React from 'react'
import classes from './Users.module.css'
import userPhoto from '../../assets/images/user_no_photo.png'
import { NavLink } from 'react-router-dom'
import { usersAPI } from '../../api/api'

const Users = (props) => {
  
  const follow = (userId) => {
    props.toggleIsFollowing(true, userId)
    usersAPI.follow(userId)
      .then(data => {
        if (data.resultCode === 0) {
          props.follow(userId)
        }
        props.toggleIsFollowing(false, userId)
      })
      .catch(() => {
        props.toggleIsFollowing(false, userId)
      })
  }

  const unfollow = (userId) => {
    props.toggleIsFollowing(true, userId)
    usersAPI.unfollow(userId)
      .then(data => {
        if (data.resultCode === 0) {
          props.unfollow(userId)
        }
        props.toggleIsFollowing(false, userId)
      })
      .catch(() => {
        props.toggleIsFollowing(false, userId)
      })
  }

  let usersElements = props.users.map(user => {

    return (
      <div className={classes.usersBlock} key={user.id}>
        <div className={classes.avatar}>
          <div>
            <NavLink to={`/profile/${user.id}/`}>
              <img src={
                user.photos.small !== null 
                ? user.photos.small 
                : userPhoto } 
                alt={user.name}/>
            </NavLink>
          </div>
          <div>
            {user.followed
              ? <button 
                  disabled={props.toggleFollowing.some(id => id === user.id)}
                  onClick={() => unfollow(user.id)}
                >Unfollow</button>
              : <button 
                  disabled={props.toggleFollowing.some(id => id === user.id)}
                  onClick={() => follow(user.id)}
                  >Follow</button>}
            
          </div>
        </div>
        <div className={classes.userDescription}>
          <div>
            {user.name} <br />
            {user.status}
          </div>
        </div>
      </div>
    )
  })

  const countUsers = Math.ceil(props.totalUsersCount / props.usersPerPage)

  let pages = []
  for (let i = 1; i <= countUsers; i++) {
    pages.push(i)
  }

  const usersPaginatorElement = pages.map((item) => {
    let activeClass = props.currentPage === item ? classes.activePageItem : ''
    return (
      <div className={`${classes.pageItem} ${activeClass}`} key={item}
        onClick={() => props.onChangePage(item)}
      >
        <div>{item}</div>
      </div> 
    )
  })

  return (
    <React.Fragment>
      <div className={classes.paginator}>
        {usersPaginatorElement}
      </div>
      <div>
        {/* <button onClick={() => this.getUsers()}>Get users</button> */}
        {usersElements}
      </div>
    </React.Fragment>
  )
}

export default Users