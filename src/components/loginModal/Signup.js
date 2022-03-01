import React, { useState } from "react";
import styled from "styled-components";
import { emailCheck } from "../../shared/common";
// import { actionCreators as userActions } from "../redux/modules/user";

const Signup = (props) => {
  const [password, setPw] = useState("");
  const [passwordcheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [stack, setStack] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [gitUrl, setGitUrl] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const [status, setStatus] = useState(false);

  const signup = () => {
    if (!password || password.length < 4) {
      alert("비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다");
      return;
    }
    // 비밀번호와 비밀번호 확인 부분이 일치하나 확인!
    if (password !== passwordcheck) {
      window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    // if (!name) {
    //   alert("이름을 입력해주세요!");
    //   return;
    // }
    // dispatch(userActions.signupAction(userEmail, password, passwordcheck, userName));
    // dispatch(userActions.loginAction(userEmail, password));
    setStatus(true);
  };

  const addInfo = () => {
    console.log(name, stack, phoneNum, gitUrl, blogUrl);
  };

  if (status === false) {
    return (
      <>
        <h2>회원가입</h2>
        <p>email:{props.email}</p>
        비밀번호 :{" "}
        <input
          onChange={(e) => {
            setPw(e.target.value);
          }}
        />
        <br />
        비밀번호확인 :{" "}
        <input
          onChange={(e) => {
            setPwCheck(e.target.value);
          }}
        />
        <br />
        <button onClick={signup}>회원가입</button>
      </>
    );
  } else {
    return (
      <>
        <h2>추가기입</h2>
        이름 :{" "}
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <br />
        기술스택! :{" "}
        <input
          onChange={(e) => {
            setStack(e.target.value);
          }}
        ></input>
        <br />
        전화번호 :{" "}
        <input
          onChange={(e) => {
            setPhoneNum(e.target.value);
          }}
        ></input>
        <br />
        gitUrl :{" "}
        <input
          onChange={(e) => {
            setGitUrl(e.target.value);
          }}
        ></input>
        <br />
        blogUrl :{" "}
        <input
          onChange={(e) => {
            setBlogUrl(e.target.value);
          }}
        ></input>
        <br />
        <button onClick={addInfo}>회원가입</button>
      </>
    );
  }
};

export default Signup;

const StyledBox = styled.div`
  margin: auto;
  padding: 20px;
  min-width: 250px;
  width: auto;
  height: auto;
  /* color: ${(props) => (props.theme === "light" ? "white" : "#121212")}; */

  /* background-color: ${(props) =>
    props.theme === "light" ? "white" : "#121212"};; */
`;

const Stack = styled.button`
  margin: 10px 10px 0px 0px;
  font-size: 16px;
  background-color: #4cbc9b;
  color: white;
  padding: 10px 1px;
  font-weight: bold;
  width: 95.99px;
  height: 47.99px;
  border: none;
  position: absolute;
  right: 36px;
  border: none;
`;
