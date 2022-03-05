
import React from 'react';
import styled from 'styled-components';
// import { actionCreators as userActions } from '../redux/modules/user';
import { emailCheck } from '../../shared/common';
import { apis } from '../../shared/axios';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { setCookie } from '../../shared/cookie';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../../redux/modules/user';
import { useSelector } from 'react-redux';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useHistory } from 'react-router-dom';

const Login = (props) => {

  const userInfo = useSelector(state => state.user.user)
  console.log(userInfo.isFirstLogin)

  const dispatch = useDispatch();
  const history = useHistory();
  const email = props.email
  const loginClose = props.loginClose
  const [password, loginPw] = React.useState("");

  const [passwordError, setPasswordError] = useState('');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const login = async () => {
    if (!password || password.length < 4) {
      setPasswordError("올바르지 않은 비밀번호입니다.");
      return;
    }
    setPasswordError("")

    await apis
      .login(email, password)
      .then((res) => {
        setCookie("token", res.headers.authorization, 5);
        dispatch(userActions.loginDB(res.data.data.isFirstLogin))

        if (res.data.data.isFirstLogin === true) {
          console.log(res.data.data.isFirstLogin)
        }
        else {
          loginClose(false)
        }
      })
      .catch((error) => alert("회원정보가 일치하지 않습니다."));

    // dispatch(userActions.loginDB(email, password));

    console.log(userInfo)
    console.log(props.isFirstLogin)
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
      <TextContainer>
        <h1>비밀번호 입력하기</h1>
        <p>Portfolio를 이용하시려면 비밀먼호를 입력해 주세요.</p>
      </TextContainer>
      <InputBox>
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
          style={{ marginTop: "35px" }}
          onChange={(e) => { loginPw(e.target.value) }}
          required
          variant='standard'
          fullWidth
          type={values.showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          placeholder="비밀번호*"
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

        <WriteBtn disabled={!(password) ? true : false} onClick={login}>로그인</WriteBtn>

      </InputBox>
      <OrBox>
        <Line />
        <Or>또는</Or>
        <KakaoBtn>카카오계정으로 로그인하기</KakaoBtn>
      </OrBox>


    </>


  )
}
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
export default Login;

