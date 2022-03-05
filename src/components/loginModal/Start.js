
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
      <TextContainer>
        <h1>시작하기</h1>
        <p>환영합니다 이메일을 입력해주세요.</p>
      </TextContainer>
      <InputBox>
        <TextField
          onChange={inputEmail}
          variant="standard"
          required
          autoFocus
          fullWidth
          type="email"
          id="email"
          name="email"
          placeholder="이메일 주소"
          error={emailError !== '' || false}
        />
        {emailError && <span style={{ fontSize: "12px", color: "red" }}>{emailError}</span>}

        <WriteBtn disabled={!(email) || !email ? true : false} onClick={sumitEmail}>계속하기</WriteBtn>

      </InputBox>
      <OrBox>
        <Line />
        <Or>또는</Or>
        <KakaoBtn>카카오계정으로 로그인하기</KakaoBtn>
      </OrBox>




    </>
  )
}

export default Start;

const TextContainer = styled.div`
  width:350px;
  height: 102px;
  margin: 80px 115px 130px 115px;
  h1{
    text-align: left;
    font-size: 36px;
    font-weight: 600;
  }
  p{
    text-align: left;
    margin-top: 34px;
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: normal;
  }
`;

const InputBox = styled.div`
  width:350px;
  height: 97px;
  margin: 0px 115px 193px 115px;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  width: 88px;
  height: 40px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin: 25px 0px 0px 262px ;
  padding: 5px 18px 5px 18px;
  color: white;
  background-color: #333333;
  :disabled{
    border: none;
    background-color: gray;
  }
`;
const OrBox = styled.div`
  width:350px;  
  height: 118px;
  margin: 0px 115px 0px 115px;
`;

const Line = styled.div`
  position: absolute;
  border-top: 1px solid;
  color:#999999;
  width:350px;  
  height: 138px;
  margin-top: 14px;
`;


const Or = styled.div`
position: absolute;
  background-color: white;
  width: 25px;
  height: 17px;
  margin: 0px 152px 0px 152px;
  font-size: 14px;
  color:#999999;
  padding: 8px 10px 10px 10px;
`

const KakaoBtn = styled.button`
  cursor: pointer;
  width: 350px;
  height: 62px;
  border-radius: 43px;
  border: 1px solid #3C1E1E;
  font-size: 16px;
  margin-top: 37px;
  padding: 20px 73px 20px 73px;
  
  color: black;
  background-color: white;
  :disabled{
    border: none;
    background-color: gray;
  }
`;



