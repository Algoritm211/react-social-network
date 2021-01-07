import React from 'react'
import classes from './User.module.css'
import userPhoto from '../../../assets/images/user_no_photo.png'
import {NavLink} from 'react-router-dom'
import {UsersType} from "../../../types/types";
import {Avatar, Button, Card, Col, Row} from 'antd';
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";


type PropsType = {
  user: UsersType,
  toggleFollowing: Array<number>,
  follow: (userId: number) => void,
  unfollow: (userId: number) => void,
}


const User: React.FC<PropsType> = ({user, toggleFollowing, unfollow, follow}) => {

  const toggleFollowButton = (name: string, onToggleFollow: typeof follow | typeof unfollow) => {
    return (
      <Button
        type="primary"
        className={classes.followButton}
        loading={toggleFollowing.some(id => id === user.id)}
        onClick={() => onToggleFollow(user.id)}
      >{name}</Button>
    )
  }

  const followButton = toggleFollowButton('Follow', follow)
  const unfollowButton = toggleFollowButton('Unfollow', unfollow)


  return (
    <React.Fragment>
      <Card
        hoverable={true}
        className={classes.userCard}
        title={user.name}
        actions={[
          <div className={classes.userCardFooter}>
            {user.followed
              ? unfollowButton
              : followButton}
          </div>,
        ]}
      >
        <div>
          <Row>
            <Col span={5}>
              <div className={classes.avatar}>
                <div>
                  <NavLink to={`/profile/${user.id}/`}>
                    <Avatar
                      size={80}
                      src={
                        user.photos.small !== null
                          ? user.photos.small
                          : userPhoto}
                      alt={user.name}>{user.name}</Avatar>
                  </NavLink>
                </div>
              </div>
            </Col>
            <Col span={19}>
              <div className={classes.userDescription}>
                <div>
                  <b>Статус</b>: {user.status ? user.status : 'В настоящий момент не имею статуса'}
                </div>
                <div>
                  {
                    user.followed
                      ? <span>
                        <CheckCircleOutlined/> Является Вашим другом
                      </span>

                      : <span>
                        <CloseCircleOutlined/> Не является Вашим другом
                      </span>
                  }
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
      <br/>
    </React.Fragment>
  )
}

export default User