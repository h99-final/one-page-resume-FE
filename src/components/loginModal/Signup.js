
import { current } from 'immer';
import React, { useState } from 'react';
import styled from 'styled-components';
import { emailCheck } from '../../shared/common';
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from '../../shared/axios';

const Signup = (props) => {

  const email = props.email


  const [password, setPw] = React.useState("");
  const [passwordcheck, setPwCheck] = React.useState("");
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [gitUrl, setGitUrl] = React.useState("");
  const [blogUrl, setBlogUrl] = React.useState("");

  const [status, setStatus] = React.useState(false);

  const [isChecked, setIsChecked] = React.useState(false);

  const [stack, setStack] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
      console.log("체크 반영 완료", stack);
    } else {
      setStack(stack.filter(el => el !== id));
      console.log("체크 해제 반영 완료", stack);
    }
  };
  console.log(stack)
  const isAllChecked = stack.length === 2;
  const disabled = !isAllChecked;

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

    apis.emailCheck(email, password, passwordcheck)
      .then((res) => {
        if (res === true) {
          return (
            console.log(res)
          )
        }
      })
    // dispatch(userActions.signupAction(userEmail, password, passwordcheck, userName));
    // dispatch(userActions.loginAction(userEmail, password));
    setStatus(true)
  };

  const addInfo = () => {
    console.log(name, stack, phoneNum, gitUrl, blogUrl)
    apis.emailCheck(name, stack, phoneNum, gitUrl, blogUrl)
      .then((res) => {
        if (res === true) {
          return (
            console.log(res)
          )
        }
      })
  }

  React.useState(() => {

  }, [])


  if (status === false) {
    return (
      <>
        <h2>회원가입</h2>
        <p>email:{props.email}</p>
        비밀번호 : <input onChange={(e) => { setPw(e.target.value) }}></input>
        <br />
        비밀번호확인 : <input onChange={(e) => { setPwCheck(e.target.value) }}></input>
        <br />

        <button onClick={signup}>회원가입</button>
      </>
    )
  }
  else {
    return (
      <>
        <h2>추가기입</h2>
        이름 : <input onChange={(e) => { setName(e.target.value) }}></input>
        <br />



        전화번호 : <input onChange={(e) => { setPhoneNum(e.target.value) }}></input>
        <br />

        gitUrl : <input onChange={(e) => { setGitUrl(e.target.value) }}></input>
        <br />

        blogUrl : <input onChange={(e) => { setBlogUrl(e.target.value) }}></input>
        <br />

        <input
          type="checkbox"
          id="JS"
          checked={stack.includes('JS') ? true : false}
          onChange={e => {
            changeHandler(e.currentTarget.checked, 'JS');
          }}
        ></input>
        <label id="JS" htmlFor="JS"></label>
        <span>JS</span>

        <input

          type="checkbox"
          id="JAVA"
          checked={stack.includes('JAVA') ? true : false}
          onChange={e => {
            changeHandler(e.currentTarget.checked, 'JAVA');
          }}
        ></input>
        <label id="JAVA" htmlFor="JAVA"></label>
        <span>JAVA</span>

        <input
          type="checkbox"
          id="PYTHON"
          checked={stack.includes('PYTHON') ? true : false}
          onChange={e => {
            changeHandler(e.currentTarget.checked, 'PYTHON');
          }}
        ></input>
        <label id="PYTHON" htmlFor="PYTHON"></label>
        <span>PYTHON</span>

        <input
          type="checkbox"
          id="C"
          checked={stack.includes('C') ? true : false}
          onChange={e => {
            changeHandler(e.currentTarget.checked, 'C');
          }}
        ></input>
        <label id="C" htmlFor="C"></label>
        <span>C</span>

        <input
          type="checkbox"
          id="REACT"
          checked={stack.includes('REACT') ? true : false}
          onChange={e => {
            changeHandler(e.currentTarget.checked, 'REACT');
          }}
        ></input>
        <label id="REACT" htmlFor="REACT"></label>
        <span>REACT</span>


        {/* {defaultStack.map((stack, index) => {
          return (
            <>
              <label htmlFor={stack}>{stack}</label>
              <input type="checkbox" id={stack} onChange={() => checkHandler(index)}></input>
            </>

          )
        })} */}
        {/* <label>JS</label><input type="checkbox" value="JS" onChange={(e) => { checkHandler(e) }} />
        <label>Java</label><input type="checkbox" value="Java" onChange={(e) => { checkHandler(e) }} />
        <label>Python</label><input type="checkbox" value="Python" onChange={(e) => { checkHandler(e) }} />
        <label>C</label><input type="checkbox" value="C" onChange={(e) => { checkHandler(e) }} /> */}


        {/* <Stack onClick={addStack} >스택추가</Stack> */}
        {/* <Stack onChange={(e) => { setStackValue(e.target.value) }} onClick={addStack} >Java</Stack>
        <Stack onChange={(e) => { setStackValue(e.target.value) }} onClick={addStack} >React</Stack> */}

        <div>
          <button onClick={addInfo}>완료</button>
        </div>
      </>
    )
  }

}


export default Signup;

const StyledBox = styled.div`
margin: auto;

  padding: 20px;
  min-width: 250px;
  width: auto;
  height: auto;
`


const Stack = styled.button`
  margin: 10px 10px 0px 0px;
  font-size: 16px;
  background-color: #4cbc9b;
  color: white;
  padding: 10px 1px;
  font-weight: bold;
  width: 90px;
  height: 45px;
  border: none;
  border-radius: 25px;
  :hover{
    background-color: red;
  }
  :checked{
    background-color: yellow;
  }
  

`;
