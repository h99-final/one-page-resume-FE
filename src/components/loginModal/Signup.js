import React, { useState } from "react";
import styled from "styled-components";
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from "../../shared/axios";
import { TextField } from "@mui/material";

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
  const email = props.email;

  const [password, setPw] = React.useState("");
  const [passwordCheck, setPwCheck] = React.useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const [stack, setStack] = useState([]);
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
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
      setStack(stack.filter((el) => el !== id));
      console.log("체크 해제 반영 완료", stack);
    }
  };
  const isAllChecked = stack.length === 2;
  const disabled = !isAllChecked;

  const signup = () => {
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

    apis
      .signup(email, password, passwordCheck)
      .then((res) => {
        dispatch(userActions.loginDB(email, password));
      })
      .catch((error) => {
        alert("회원가입에 실패했습니다.");
      });
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
            focuscolor="#00C4B4"
            id="standard-read-only-input"
            defaultValue={props.email}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="standard"
          />
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
            <span style={{ fontSize: "12px", color: "orange" }}>
              {passwordError}
            </span>
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
            <span style={{ fontSize: "12px", color: "orange" }}>
              {passwordCheckError}
            </span>
          )}

          <WriteBtn
            disabled={!passwordCheck || !password ? true : false}
            onClick={signup}
          >
            다음 {">"}{" "}
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
    border: none;
    background-color: #424453;
  }
`;
