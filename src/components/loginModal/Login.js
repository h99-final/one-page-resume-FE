import React, { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useSelector } from "react-redux";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { KAKAO_AUTH_URL } from '../../shared/kakaoAuth';

const theme = createTheme({
  palette: {
    error: orange,
  },
});

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor"
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focuscolor
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor
    }
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    color: "white",
    width: '100%',
    borderBottom: '1px solid white',
  },
}));
const Login = (props) => {
  const dispatch = useDispatch();
  const email = props.email;
  const loginClose = props.loginClose;
  const [password, loginPw] = React.useState("");
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin);

  const [passwordError, setPasswordError] = useState("");
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const login = () => {
    if (!password || password.length < 4) {
      setPasswordError("올바르지 않은 비밀번호입니다.");
      return;
    }
    setPasswordError("");

    dispatch(userActions.loginDB(email, password));
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
        <p>포그를 이용하시려면 비밀번호를 입력해 주세요.</p>
      </TextContainer>
      <ThemeProvider theme={theme}>


        <InputBox>
          <CssTextField
            id="standard-read-only-input"
            defaultValue={props.email}
            fullWidth
            focuscolor="#00C4B4"
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
          <CssTextField
            style={{ marginTop: "35px" }}
            onChange={(e) => {
              loginPw(e.target.value);
            }}
            focuscolor="#00C4B4"
            required
            variant="standard"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="비밀번호*"
            error={passwordError !== "" || false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="absolute" >
                  <IconButton
                    style={{ color: "white", borderBottom: "1px solid white", borderRadius: "0", height: "33px", }}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {passwordError && (

            <div style={{ textAlign: "left" }}>
              <span style={{ fontSize: "14px", color: "orange" }}>
                {passwordError}
              </span>
            </div>
          )}

          <WriteBtn disabled={!password ? true : false} onClick={login}>
            로그인
          </WriteBtn>
        </InputBox>
      </ThemeProvider>
      <OrBox>
        <Line />
        <Or>또는</Or>
        <img
          style={{ marginTop: "50px", cursor: "pointer" }}
          onClick={() => {
            window.location.href = `${KAKAO_AUTH_URL}`;
          }}
          alt="" src={process.env.PUBLIC_URL + "/img/kakaologin.svg"} />
      </OrBox>
    </>
  );
};
const TextContainer = styled.div`
  width: 350px;
  height: 102px;
  margin: 80px 115px 130px 115px;
  h1 {
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    color: #FFFFFF;
  }
  p {
    text-align: left;
    margin-top: 34px;
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: normal;
    color: #CFD3E2CC;
  }
`;

const InputBox = styled.div`
  width: 350px;
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
  margin: 25px 0px 0px 262px;
  padding: 5px 18px 5px 18px;
  color: white;
  background-color: #00C4B4;
  :disabled {
    border: none;
    background-color: #424453;
  }
`;
const OrBox = styled.div`
  width: 350px;
  height: 118px;
  margin: 0px auto;
  text-align: center;
  border: 1px solid #2C2E39;
  position: relative;
`;

const Line = styled.div`
  position: absolute;
  border-top: 1px solid;
  color: #696B7B;
  width: 350px;
  z-index: 0;
  margin-top: 14px;
`;

const Or = styled.div`
  background-color: #2C2E39;
  position: absolute;
  text-align: center;
  width: 45px;
  z-index: 1;
  height: 17px;
  margin: 0px 151px;
  font-size: 14px;
  color: #999999;
  padding: 8px 0px 10px 0px;
`;


export default Login;
