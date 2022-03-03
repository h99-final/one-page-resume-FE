
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

const ExitModal = ({ exitClose }) => {
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
        <UserBox>
          <h1>정말 나가시겠어요?</h1>
          <p>추가정보가 완전히 입력되지 않았어요.</p>
          <p>지금 나가면 정보가 저장되지 않아요. 그래도 나가시겠습니까?</p>
          <Btn onClick={() => { window.location.reload('/') }}>다음에 할게요</Btn>
          <Btn onClick={() => { exitClose(false) }}>입력할게요</Btn>
        </UserBox>
      </ModalBox>
    </>
  )
}

export default ExitModal;


const ModalBox = styled.div`
  text-align: center;
  border-radius: 10px;
  display: flex;
  width: 620px;
  height: 40vh;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

align-items: center;
text-align: center;
`;

const Btn = styled.button`
  cursor: pointer;
  border-radius: 25px;
  margin: 15px 0px 0px 5px;
  border: none;
  font-size: 17px;
  padding: 10px 10px;
  margin-left: 40px;
  margin-right: 40px;
  border-radius: 25px;
  color: black;
  background-color: white;
`;

const UserBox = styled.div`
  background-color: #333333;
  color:white;
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 22vh;

`;


