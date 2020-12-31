import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Header.module.css'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuth, getLogin, getUserPhotoSmall} from "../../redux/auth-selector";
import {logoutUser} from '../../redux/auth-reducer';
import {Avatar, Button, Col, Layout, Row} from "antd";



type PropsType = {}

const {Header} = Layout;

const AppHeader: React.FC<PropsType> = (props) => {

  const dispatch = useDispatch()

  const isAuth = useSelector(getIsAuth)
  const login = useSelector(getLogin)
  const userPhoto = useSelector(getUserPhotoSmall)

  const onLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <Header className="header">
      <Row>
        <Col span={20}>
          <div className={classes.nameSocialNetwork}>
            Social Network by Horbunov
          </div>
        </Col>
        {isAuth
          ? <React.Fragment>
            <Col span={2}>
              <Avatar size={40} src={userPhoto} alt={login || ''}>{login}</Avatar>
            </Col>
            <Col span={2}>
              <Button onClick={() => onLogout()}>Log out</Button>
            </Col>
          </React.Fragment>
          : <Col span={4}>
            <Button>
              <NavLink to='/login'>Login</NavLink>
            </Button>
          </Col>
        }
      </Row>
    </Header>
  )

}

export default AppHeader