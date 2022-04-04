import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from "../../shared/axios";
import { TextField } from "@mui/material";

import { emailCheck } from "../../shared/common";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
  '& input:valid + fieldset': {
  },
  '& input:invalid + fieldset': {
  },
  '& input:valid:focus + fieldset': { // override inline-style
  },
}));
const Signup = (props) => {
  const dispatch = useDispatch();

  const loginClose = props.loginClose;

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState("");

  const [password, setPw] = React.useState("");
  const [passwordCheck, setPwCheck] = React.useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const inputEmail = (e) => {
    setEmail(e.target.value);
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

  useEffect(() => {
    setEmail(props.newEmail)
  }, [])

  const signup = () => {
    // if (!emailCheck(email) || !email) {
    //   setEmailError("이메일 형식을 다시 확인해주세요!");
    //   return;
    // }

    if (!password || password.length < 4) {
      setPasswordError(
        "비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다"
      );
      return;
    }
    setPasswordError("");
    // 비밀번호와 비밀번호 확인 부분이 일치하나 확인!
    if (password !== passwordCheck) {
      setPasswordCheckError("패스워드와 패스워드 확인이 일치하지 않습니다!");
      return;
    }
    setPasswordCheckError("");

    apis.dupCheck(email).then((res) => {
      if (res.data.result === true) {
        setEmailError("중복된 이메일 입니다. 다시 입력해 주세요.")
      }
      else {
        apis
          .signup(email, password, passwordCheck)
          .then((res) => {
            dispatch(userActions.loginDB(email, password));
          })
          .catch((error) => {
            alert("회원가입에 실패했습니다.");
          });
      }
    })

  };

  return (
    <>
      <TextContainer>
        <h2>회원가입하기</h2>
        <p>Portfolio와 함께 멋진 포트폴리오를 만들어 보세요.</p>
      </TextContainer>
      <ThemeProvider theme={theme}>
        <InputBox>
          <CssTextField
            value={props.newEmail}
            focuscolor="#00C4B4"
            onChange={inputEmail}
            variant="standard"
            required
            fullWidth
            type="email"
            id="email"
            name="email"
            placeholder="이메일 주소"
            error={emailError !== "" || false}
          />
          {emailError && (
            <div style={{ textAlign: "left" }}>
              <span style={{ fontSize: "14px", color: "orange" }}>{emailError}</span>
            </div>
          )}
          <CssTextField
            focuscolor="#00C4B4"
            style={{ marginTop: "35px" }}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            required
            variant="standard"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="비밀번호(4글자 이상)*"
            error={passwordError !== "" || false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="absolute">
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

          <CssTextField
            style={{ marginTop: "35px" }}
            onChange={(e) => {
              setPwCheck(e.target.value);
            }}
            focuscolor="#00C4B4"
            required
            variant="standard"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            id="passwordcheck"
            name="passwordcheck"
            placeholder="비밀번호 재입력*"
            error={passwordCheckError !== "" || false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="absolute">
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
          {passwordCheckError && (
            <div style={{ textAlign: "left" }}>
              <span style={{ fontSize: "14px", color: "orange" }}>
                {passwordCheckError}
              </span>
            </div>
          )}

          <WriteBtn
            disabled={!passwordCheck || !password ? true : false}
            onClick={signup}
          >
            다음
          </WriteBtn>
        </InputBox>
      </ThemeProvider>
    </>
  );
};

export default Signup;

const TextContainer = styled.div`
  width: 350px;
  height: 102px;
  margin: 80px 115px 125px 115px;
  h2 {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    color: #FFFFFF;
  }
  p {
    text-align: center;
    margin-top: 34px;
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: normal;
    color: #FFFFFF;
  }
`;

const InputBox = styled.div`
  width: 350px;
  height: 240px;
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
    color: #696B7B;
    border: none;
    background-color: #424453;
  }
`;
