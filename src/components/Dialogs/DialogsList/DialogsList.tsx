import React from 'react'
import { DialogsDataType } from '../../../redux/dialogs-reducer';
import classes from './DialogsList.module.css'
import { List, Avatar } from 'antd';


type Props = {
  dialogsData: Array<DialogsDataType>
}

const DialogsList: React.FC<Props> = (props) => {

  return (
    <React.Fragment>
      <List
        itemLayout="horizontal"
        dataSource={props.dialogsData}
        renderItem={(dialog) => {
          return (
            <List.Item className={classes.dialogFrame}>
              <div className={classes.dialogContent}>
                <div className={classes.dialogListAvatar}>
                  <Avatar size={50} src={"https://i.imgur.com/Ss75Vfa.jpg"} alt="dialogItem" />
                </div>
                <div className={classes.dialogListName}>
                  {dialog.name}
                </div>
              </div>
            </List.Item>
          )
        }}
      />
    </React.Fragment>
  )
}
export default DialogsList