
import { current } from 'immer';
import React, { useState } from 'react';
import styled from 'styled-components';
import { phoneCheck, urlCheck } from '../../shared/common';
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from '../../shared/axios';
import { TextField } from '@mui/material';

import Input from '@mui/material/Input';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import { actionCreators as userActions } from '../../redux/modules/user';
import { useDispatch } from 'react-redux';

const Signup = (props) => {
  const dispatch = useDispatch();

  const email = props.email


  const [password, setPw] = React.useState("");
  const [passwordCheck, setPwCheck] = React.useState("");
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [gitUrl, setGitUrl] = React.useState("");
  const [blogUrl, setBlogUrl] = React.useState("");

  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');

  const [nameError, setNameError] = React.useState("");
  const [phoneNumError, setPhoneNumError] = React.useState("");
  const [gitUrlError, setGitUrlError] = React.useState("");
  const [blogUrlError, setBlogUrlError] = React.useState("");

  const [status, setStatus] = React.useState(false);


  const [stack, setStack] = useState([]);
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
      setPasswordError("비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다");
      return;
    }
    setPasswordError("");
    // 비밀번호와 비밀번호 확인 부분이 일치하나 확인!
    if (password !== passwordCheck) {
      setPasswordCheckError("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    setPasswordCheckError("");

    dispatch(userActions.SignUpDB(email, password, passwordCheck))

  };


  return (
    <>
      <h2>회원가입하기 (1/3)</h2>
      <p>Portfolio와 함께 멋진 포트폴리오를 만들어 보세요.</p>
      <TextField
        id="standard-read-only-input"
        defaultValue={props.email}
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <TextField
        onChange={(e) => { setPw(e.target.value) }}
        required
        variant='standard'
        fullWidth
        type={values.showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        label="비밀번호(4글자 이상)"
        error={passwordError !== '' || false}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {passwordError && <span style={{ fontSize: "12px", color: "red" }}>{passwordError}</span>}

      <TextField
        onChange={(e) => { setPwCheck(e.target.value) }}
        required
        variant='standard'
        fullWidth
        type={values.showPassword ? 'text' : 'password'}
        id="passwordcheck"
        name="passwordcheck"
        label="비밀번호 재입력"
        error={passwordCheckError !== '' || false}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      {passwordCheckError && <span style={{ fontSize: "12px", color: "red" }}>{passwordCheckError}</span>}

      <br />
      <WriteBtn disabled={!(passwordCheck) || !(password) ? true : false} onClick={signup}>다음 {'>'} </WriteBtn>
    </>
  )

}


export default Signup;

const WriteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 80px;
  border-radius: 25px;
  margin: 15px 0px 0px 5px;
  font-size: 17px;
  padding: 10px 10px;
  border: none;
  border-radius: 25px;
  color: white;
  background-color: black;
  :disabled{
    border: none;
    background-color: gray;
  }
`;


