import React from 'react'
import classes from './Users.module.css'
import axios from 'axios'
import userPhoto from '../../assets/images/user_no_photo.png'

class Users extends React.Component {


  componentDidMount() {
    this.getUsers()
  }

  getUsers() {
    if (this.props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users')
        .then(response => {
          this.props.setUsers(response.data.items)
        })
    }
  }
  
  render() {
    let usersElements = this.props.users.map(user => {
      return (
        <div className={classes.usersBlock} key={user.id}>
          <div className={classes.avatar}>
            <div>
              <img src={
                user.photos.small !== null 
                ? user.photos.small 
                : userPhoto } 
                alt={user.name}/>
            </div>
            <div>
              {user.followed
                ? <button onClick={() => this.props.unfollow(user.id)}>Unfollow</button>
                : <button onClick={() => this.props.follow(user.id)}>Follow</button>}
              
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
  
    return (
      <div>
        {/* <button onClick={() => this.getUsers()}>Get users</button> */}
        {usersElements}
      </div>
    )
  }
}

export default Users