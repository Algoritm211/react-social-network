import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import {useSelector} from "react-redux";
import {getUserPhotoLarge} from '../../../redux/auth-selector';
import classes from './ModalChangePhoto.module.css'

type ModalProps = {
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
  onChangePhoto: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ModalChangePhoto: React.FC<ModalProps> = ({isModalVisible, setIsModalVisible, onChangePhoto}) => {

  const photo = useSelector(getUserPhotoLarge)

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal title="Хотите изменить фото?" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <div className={classes.modalChangePhoto}>
        {photo
          ? <div>
            <div>
              Ваше фото в текущий момент:
            </div>
            <div>
              <img src={photo} alt={'User Current'} className={classes.userPhotoInModal}/>
            </div>
          </div>
          : <div>
            В настоящий момент у Вас нет фото, выберите фото для Вашего аватара
          </div>
        }
        <label htmlFor="uploadAvatar" id="label">Выберите файл для установки нового аватара: &nbsp;</label>
        <input
          id={'uploadAvatar'}
          type={'file'}
          onChange={onChangePhoto}
        />
      </div>
    </Modal>
  )
}
export default ModalChangePhoto