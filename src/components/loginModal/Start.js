
import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import Signup from './Signup';
import { apis } from '../../shared/axios';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { emailCheck } from '../../shared/common';
import { useSelector } from 'react-redux';
import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch } from 'react-redux';
import AddInfo from './AddInfo';

const Start = (props) => {
  const userInfo = useSelector(state => state.user.user)

  const dispatch = useDispatch();

  const statusFunction = props.status
  const emailFunction = props.email

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState('');

  const inputEmail = (e) => {
    setEmail(e.target.value)
  }

  const sumitEmail = () => {

    if (!emailCheck(email) || !email) {
      setEmailError("이메일 형식을 다시 확인해주세요!");
      return;
    }

    // statusFunction(true)

    apis.dupCheck(email)
      .then((res) => {
        emailFunction(email)
        console.log(res.data.result)
        if (res.data.result === true) {
          return (
            statusFunction(true)
          )
        }
        statusFunction(false)
      })

  }

  return (
    <>
      <h1>시작하기</h1>
      <p>이메일을 입력해주세요</p>
      <TextField
        onChange={inputEmail}
        variant="standard"
        required
        autoFocus
        fullWidth
        type="email"
        id="email"
        name="email"
        label="이메일 주소"
        error={emailError !== '' || false}
      />

      {emailError && <span style={{ fontSize: "12px", color: "red" }}>{emailError}</span>}

      <WriteBtn disabled={!(email) || !email ? true : false} onClick={sumitEmail}>시작하기</WriteBtn>
      <br></br>

    </>
  )
}

export default Start;


const WriteBtn = styled.button`
  cursor: pointer;
  border-radius: 25px;
  margin: 15px 0px 0px 5px;
  border: none;
  font-size: 17px;
  padding: 10px 10px;
  border-radius: 25px;
  color: white;
  background-color: black;
  :disabled{
    border: none;
    background-color: gray;
  }
`;


