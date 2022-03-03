
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
import Start from './Start';

const Modal = ({ modalClose }) => {
  const userInfo = useSelector(state => state.user.user)
  console.log(userInfo)

  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("aaa");

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState('');


  console.log(email)

  return (
    <>
      <ModalBox>
        <WelcomeBox >
          <h1>Portfolio</h1>
          <p>Portfolio와 함께 하면 할 수 있는 것들이에요!</p>
          <TextBox>내 프로젝트에 도움이 되는 다양한 영감을 얻어요!</TextBox>
          <TextBox>예쁜 포트폴리오를 빠르게 만들어요.</TextBox>
          <TextBox>내가 보여주고 싶은 GitHub코드만 골라서 보여줄 수 있어요.</TextBox>
        </WelcomeBox>
        <UserBox >
          <div>
            <button style={{ float: "right", backgroundColor: "inherit", border: "none" }} onClick={() => { modalClose(false); }}>❌</button>
          </div>
          {userInfo.isFirstLogin === false
            ?
            <>
              {status === "aaa" && <Start status={setStatus} email={setEmail} />}
              {status === true && <Login email={email} />}
              {status === false && <Signup email={email} />}
            </>
            :
            <>
              {userInfo.isFirstLogin === true && <AddInfo isFirstLogin={userInfo.isFirstLogin} />}
            </>
          }

        </UserBox>
      </ModalBox>
    </>
  )
}

export default Modal;


const ModalBox = styled.div`
  text-align: center;
  border-radius: 10px;
  display: flex;
  width: 1120px;
  height: 80vh;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const WelcomeBox = styled.div`
background-color: #777777;
width: 50%;
padding: 20px;
position: relative;
padding-top: 250px;
border-bottom-left-radius: 10px;
border-top-left-radius: 10px;
`;

const TextBox = styled.div`
background-color: white;
border-radius: 110px;
align-items: center;
text-align: center;
padding: 5px;
margin: 10px;
`;

const UserBox = styled.div`
  background-color: white;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  padding: 100px;
  
  position: relative;
  min-height: 500px;
  min-width: 350px;
  width: 50%;

`;


