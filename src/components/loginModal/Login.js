
import React from 'react';
import styled from 'styled-components';
// import { actionCreators as userActions } from '../redux/modules/user';
// import { emailCheck } from '../shared/common';
import { apis } from '../../shared/axios';

const Login = (props) => {
  const email = props.email
  const [userEmail, loginEmail] = React.useState("");
  const [password, loginPw] = React.useState("");
  const login = () => {

    if (!password || password.length < 4) {
      alert("비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다");
      return;
    }

    apis.emailCheck(email, password)
      .then((res) => {
        if (res === true) {
          return (
            console.log(res.data)
          )
        }
      })
    // dispatch(userActions.loginAction(userEmail, password));
  };
  return (
    <>
      <h2>비밀번호 입력</h2>
      <p>email:{props.email}</p>
      비밀번호 : <input onChange={(e) => {
        loginPw(e.target.value);
      }}></input>
      <div>
        <button onClick={login}>로그인</button>
      </div>

    </>


  )
}

export default Login;

