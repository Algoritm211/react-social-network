import React from "react";
import classes from './Post.module.css'
import {Avatar, Button, Card, Divider} from 'antd';
import {useSelector} from "react-redux";
import {getUserName, getUserPhoto} from "../../../../redux/profile-selector";
import {EditOutlined, LikeOutlined, CommentOutlined} from "@ant-design/icons";
import {RouteComponentProps, withRouter} from "react-router-dom";

type OwnProps = {
  message: string,
  likesCount: number
}

type PathParamsType = {
  userId: string
}

type Props = OwnProps & RouteComponentProps<PathParamsType>

const Post: React.FC<Props> = (props) => {

  const onEdit = () => {
    alert('Опция в разработке')
  }

  const onComment = () => {
    alert('В настоящее время комментарии в разработке')
  }

  const onLike = () => {
    alert('В настоящее время лайки к постам в разработке')
  }

  return (
    <React.Fragment>
      <Card
        hoverable={true}
        style={{width: '100%'}}
        title={CardTitle()}
        extra={!props.match.params.userId &&
        <Button type="dashed" icon={<EditOutlined/>} onClick={onEdit}>Edit</Button>
        }
        actions={[
          <div className={classes.cardFooter}>
            <div onClick={onLike}>
              <LikeOutlined/> {props.likesCount} Likes
            </div>
          </div>,
          <div className={classes.cardFooter}>
            <div onClick={onComment}>
              <CommentOutlined/> Comments
            </div>
          </div>
        ]}
      >
        <div>
          {props.message}
        </div>
      </Card>
      <br/>
    </React.Fragment>

  )
  // return (
  //   <div className={classes.item}>
  //     <div>
  //       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcToVm-BfiWN-1qbMxJSI3ydyyHFa7_N7vBPDw&usqp=CAU" alt=""/>
  //     </div>
  //     <div className={classes.message}>
  //       {props.message} <br/>
  //       <span>{props.likesCount} likes</span>
  //     </div>
  //   </div>
  // );
};

export default withRouter(Post)

const CardTitle = () => {

  const userPhoto = useSelector(getUserPhoto)
  const userName = useSelector(getUserName)

  return (
    <div className={classes.cardHeaderUserInfo}>
      <div>
        <Avatar size={40} src={userPhoto} alt={userName || ''}>{userName}</Avatar>
      </div>
      <div style={{marginLeft: '10px'}}>
        {userName}
      </div>
    </div>
  )
}
