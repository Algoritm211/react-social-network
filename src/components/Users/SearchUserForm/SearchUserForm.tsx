import React, {useEffect, useState} from 'react'
import {Field, FieldProps, Form, Formik} from 'formik'
import {FilterType} from "../../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getFilter} from "../../../redux/users-selector";
import {FormikInput} from '../../common/FormikFields/FormikFields';
import classes from "./SearchUserForm.module.css";
import {SearchOutlined} from '@ant-design/icons'
import {Button, Col, Row, Select} from "antd";

const {Option} = Select;


const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type FormType = {
  term: string,
  friend: string
}

type FormProps = {
  onChangeFilter: (filter: FilterType) => void
}

const SearchUserForm: React.FC<FormProps> = (props) => {

  const filter = useSelector(getFilter)

  const onSubmit = (values: FormType, {setSubmitting}: any) => {

    const preparedValues: FilterType = {
      term: values.term,
      friend: values.friend === 'null' ? null : values.friend === 'true'
    }
    // setTimeout(() => {
    //   alert(JSON.stringify(preparedValues, null, 2));
    //   setSubmitting(false);
    // }, 400);
    props.onChangeFilter(preparedValues)
    setSubmitting(false)
  }

  const sortUsersOptions = [
    {value: 'null', label: 'All'},
    {value: 'true', label: 'Only Followed'},
    {value: 'false', label: 'Only Unfollowed'}
  ]

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{term: filter.term, friend: String(filter.friend)}}
      validate={usersSearchFormValidate}
      onSubmit={onSubmit}
    >
      {({isSubmitting, values, setFieldValue}) => (
        <Form>
          <Row>
            <Col span={15} className={classes.searchUserByName}>
              <Field type="text" name="term" component={FormikInput}/>
            </Col>
            <Col span={9} className={classes.formSelectFriends}>
              <SelectFriends
                options={sortUsersOptions}
                value={values.friend}
                onChange={(value: string) => setFieldValue('friend', value)}
              />
            </Col>
          </Row>
          <div className={classes.searchUsersButton}>
            <Button htmlType="submit" type={'primary'} disabled={isSubmitting} icon={<SearchOutlined/>}>
              Search
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

type SelectFriendsProps = {
  options: Array<{ value: string; label: string }>,
  onChange: (value: string) => void,
  value: string
}

const SelectFriends: React.FC<SelectFriendsProps> = ({onChange, options, value}) => {

  return (
    <Select
      onChange={value => onChange(String(value))}
      size={'middle'} value={value}
      className={classes.formSelectFriends}>
      {options.map(option => (
        <Select.Option key={option.value} value={option.value}>
          {option.label}
        </Select.Option>
      ))}
    </Select>
  )
}

export default SearchUserForm