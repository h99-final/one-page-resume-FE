import React, { useState } from "react";
import styled from "styled-components";
// import { actionCreators as userActions } from '../redux/modules/user';
// import { emailCheck } from '../shared/common';

const Login = (props) => {
  const [password, loginPw] = useState("");

  const login = () => {
    if (password.length < 4) {
      window.alert("비밀번호가 틀렸습니다.");
      return;
    }

    // dispatch(userActions.loginAction(userEmail, password));
  };
  return (
    <>
      <h2>비밀번호 입력</h2>
      <p>email:{props.email}</p>
      비밀번호 :{" "}
      <input
        onChange={(e) => {
          loginPw(e.target.value);
        }}
      ></input>
      <button onClick={login}>로그인</button>
    </>
  );
};

export default Login;

const StyledBox = styled.div``;

const Btn = styled.button`
  margin: 10px 10px 0px 0px;
  font-size: 16px;
  background-color: #4cbc9b;
  color: white;
  padding: 10px 15px;
  font-weight: bold;
  width: 95.99px;
  height: 47.99px;
  border: none;
  position: absolute;
  right: 36px;
  border: none;
`;
