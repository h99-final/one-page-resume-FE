
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
    statusFunction(true)
    // dispatch(userActions.emailCheckDB(email))
    // apis.dupCheck(email)
    //   .then((res) => {
    //     console.log(res.data.result)
    //     if (res.data.result === true) {
    //       return (
    //         setStatus(true)
    //       )
    //     }
    //     setStatus(false)
    //   })

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

      <div>
        <button onClick={sumitEmail}>시작하기</button>
      </div>
      <br></br>

    </>
  )
}

export default Start;


const ModalBox = styled.div`
  border: 1px solid red;
  display: flex;
  width: 1020px;
  height: 80vh;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  z-index: 100;
`;

const WelcomeBox = styled.div`
border: 1px solid red;
background-color: inherit;
width: 50%;
padding: 20px;
position: relative;
border-radius: 10px;
`;

const TextBox = styled.div`
background-color: white;
align-items: center;
text-align: center;
padding: 5px;
border-radius: 10px;
margin: 10px;
`;

const UserBox = styled.div`
  background-color: white;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  min-height: 500px;
  min-width: 350px;
  width: 50%;

`;


