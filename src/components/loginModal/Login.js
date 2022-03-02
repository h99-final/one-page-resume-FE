
import React from 'react';
import styled from 'styled-components';
// import { actionCreators as userActions } from '../redux/modules/user';
import { emailCheck } from '../../shared/common';
import { apis } from '../../shared/axios';
import { useState } from 'react';
import { TextField } from '@mui/material';

import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
import { useSelector } from 'react-redux';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

const Login = (props) => {
  const dispatch = useDispatch();

  const email = props.email
  const [userEmail, loginEmail] = React.useState("");
  const [password, loginPw] = React.useState("");

  const [passwordError, setPasswordError] = useState('');
  // const [nameError, setNameError] = useState('');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });
  const login = () => {

    if (!password || password.length < 4) {
      setPasswordError("비밀번호가 틀림");
      return;
    }
    setPasswordError("")
    console.log(email, password)
    // apis.login(email, password)
    //   .then((res) => {
    //     if (res === true) {
    //       return (
    //         console.log(res.data)
    //       )
    //     }
    //   })
    dispatch(userActions.loginDB(userEmail, password));

  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <h2>비밀번호 입력</h2>
      <TextField
        onChange={(e) => { loginPw(e.target.value) }}
        required
        variant='standard'
        fullWidth
        type={values.showPassword ? 'text' : 'password'}
        id="password"
        name="password"
        label="비밀번호"
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


      <div>
        <button onClick={login}>로그인</button>
      </div>

    </>


  )
}

export default Login;

