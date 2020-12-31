import React from 'react'
import classes from './User.module.css'
import userPhoto from '../../../assets/images/user_no_photo.png'
import {NavLink} from 'react-router-dom'
import {UsersType} from "../../../types/types";



type PropsType = {
    user: UsersType,
    toggleFollowing: Array<number>,
    follow: (userId: number) => void,
    unfollow: (userId: number) => void,
}


const User: React.FC<PropsType> = ({user, toggleFollowing, unfollow, follow}) => {
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
                  disabled={toggleFollowing.some(id => id === user.id)}
                  onClick={() => unfollow(user.id)}
                >Unfollow</button>
              : <button 
                  disabled={toggleFollowing.some(id => id === user.id)}
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
}

export default User