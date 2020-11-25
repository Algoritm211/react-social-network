import React from 'react'
import classes from './Users.module.css'

const Users = (props) => {
  if (props.users.length === 0) {
    props.setUsers([
      {id: 1, avatarUrl: "https://mygamehunter.ru/images/thumbnail/29175/550", followed: true, fullName: 'Alexey', status: 'I`m React Dev', location: {city: 'New-York', country: 'USA'}},
      {id: 2, avatarUrl: "https://mygamehunter.ru/images/thumbnail/29175/550", followed: true, fullName: 'Ed', status: 'I`m a boss', location: {city: 'Berlin', country: 'Germany'}},
      {id: 3, avatarUrl: "https://mygamehunter.ru/images/thumbnail/29175/550", followed: false, fullName: 'Anton', status: 'I`m Anton', location: {city: 'London', country: 'Great Britain'}},
    ])
  }
  
  let usersElements = props.users.map(user => {
    return (
      <div className={classes.usersBlock} key={user.id}>
        <div className={classes.avatar}>
          <div>
            <img src={user.avatarUrl} alt={user.name}/>
          </div>
          <div>
            {user.followed
              ? <button onClick={() => props.unfollow(user.id)}>Unfollow</button>
              : <button onClick={() => props.follow(user.id)}>Follow</button>}
            
          </div>
        </div>
        <div className={classes.userDescription}>
          <div>
            {user.fullName} <br />
            {user.status}
          </div>
          <div>
            {user.location.city} <br/>
            {user.location.country}
          </div>
        </div>
      </div>
    )
  })

  return (
    <div>
      {usersElements}
    </div>
  )
}

export default Users