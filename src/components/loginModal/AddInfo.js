
import { current } from 'immer';
import React, { useState } from 'react';
import styled from 'styled-components';
import { phoneCheck, urlCheck } from '../../shared/common';
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from '../../shared/axios';
import { TextField } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { actionCreators, actionCreators as userActions } from '../../redux/modules/user';
import { useDispatch } from 'react-redux';

const AddInfo = (props) => {
  const dispatch = useDispatch();



  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [gitUrl, setGitUrl] = React.useState("");
  const [blogUrl, setBlogUrl] = React.useState("");

  const [page, setPage] = React.useState("1");

  const [nameError, setNameError] = React.useState("");
  const [phoneNumError, setPhoneNumError] = React.useState("");
  const [gitUrlError, setGitUrlError] = React.useState("");
  const [blogUrlError, setBlogUrlError] = React.useState("");



  const [stack, setStack] = useState([]);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });


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


  const goNext = () => {
    const nameRegex = /^[가-힣a-zA-Z]+$/;
    if (!nameRegex.test(name) || name.length < 2) {
      setNameError("이름을 입력해주세요");
      return;
    }
    else setNameError("")

    if (!phoneCheck(phoneNum)) {
      setPhoneNumError("올바른 번호를 입력하세요");
      return;
    }
    else setPhoneNumError("")

    if (!urlCheck(gitUrl)) {
      setGitUrlError("URL형식이 잘못되었습니다.");
      return;
    }

    setPage("2")
  }
  const addInfo = () => {
    console.log(name, stack, phoneNum, gitUrl, blogUrl)

    dispatch(userActions.userInfoDB(name, stack, phoneNum, gitUrl, blogUrl))

  }

  return (
    <>

      {page === "1" &&
        <Wrap>
          <h2>추가정보 입력하기 (2/3)</h2>
          <p>Portfolio와 함께 멋진 포트폴리오를 만들어보세요.</p>
          <TextField
            onChange={(e) => { setName(e.target.value) }}
            required
            variant='standard'
            fullWidth
            id="name"
            name="name"
            label="이름"
            error={nameError !== '' || false}
          />
          {nameError && <span style={{ fontSize: "12px", color: "red" }}>{nameError}</span>}

          <br />
          <br />
          <TextField
            onChange={(e) => { setPhoneNum(e.target.value) }}
            required
            variant='standard'
            fullWidth
            id="phone"
            name="phone"
            label="전화번호"
            error={phoneNumError !== '' || false}
          />
          {phoneNumError && <span style={{ fontSize: "12px", color: "red" }}>{phoneNumError}</span>}
          <br />
          <br />
          <TextField
            onChange={(e) => { setGitUrl(e.target.value) }}
            variant='standard'
            fullWidth
            id="giturl"
            name="giturl"
            label="gitURl"
            error={gitUrlError !== '' || false}
          />
          {gitUrlError && <span style={{ fontSize: "12px", color: "red" }}>{gitUrlError}</span>}
          <br />
          <br />
          <TextField
            onChange={(e) => { setBlogUrl(e.target.value) }}
            variant='standard'
            fullWidth
            id="blogurl"
            name="blogurl"
            label="blogURl"
          // error={blogUrlError !== '' || false}
          />
          {/* {blogUrlError && <span style={{ fontSize: "12px", color: "red" }}>{blogUrlError}</span>} */}


          <div>
            <WriteBtn disabled={!(name) || !(gitUrl) ? true : false} onClick={goNext}>다음{'>'}</WriteBtn>
          </div>
        </Wrap>
      }
      {page === "2" &&
        <Wrap>
          <h2>3가지 고르세요(3/3)</h2>
          <p>Portfolio 추천 프로젝트에 반영될 수 있어요!</p>

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

          <div>
            <WriteBtn onClick={addInfo}>가입하기</WriteBtn>
          </div>
        </Wrap>
      }
    </>
  )
}




export default AddInfo;

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
const WriteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 80px;
  top: 80%;
  border-radius: 25px;
  margin: 15px 0px 0px 5px;
  font-size: 17px;
  padding: 10px 10px;
  border: 1px none;
  border-radius: 25px;
  color: white;
  background-color: black;
  :disabled{
    border: none;
    background-color: gray;
  }
`;

const Wrap = styled.div` 
  padding: 20px;
  margin: 90px 0px 0px 0px ;
`;

