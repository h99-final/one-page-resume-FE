import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import {
  Content,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  Font,
  InputPassword,
} from "../makeporf/shared/_sharedStyle";
import { apis } from "../../shared/axios";
import FileUpload from "../makeporf/shared/ImageUpload";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { orange } from "@mui/material/colors";
import { TextField } from "@mui/material";
import { useHistory } from "react-router-dom";

const theme = createTheme({
  palette: {
    error: orange,
  },
});

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor,
    },
    '& fieldset': {
      borderColor: "#696B7B"
    },
  },
  "& .MuiInputBase-input": {
    position: "relative",
    color: "white",
    width: "100%",
  },
  "& input:valid + fieldset": {},
  "& input:invalid + fieldset": {},
  "& input:valid:focus + fieldset": {
    // override inline-style
  },
}));
function EditPwd() {
  const history = useHistory();
  const [curPassword, setCurPw] = React.useState("");
  const [password, setPw] = React.useState("");
  const [passwordCheck, setPwCheck] = React.useState("");

  const [curPasswordError, setCurPwError] = React.useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");

  const [values, setValues] = React.useState({
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

  const editPwd = () => {
    if (!curPassword || curPassword.length < 4) {
      setCurPwError(
        "비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다"
      );
      return;
    }
    setCurPwError("");
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
    const data = {
      curPassword: curPassword,
      password: password,
      passwordCheck: passwordCheck,
    };
    apis
      .putPwd(data)
      .then((res) => {
        alert("비밀번호 변경 완료");
        history.push("/mypage");
      })
      .catch((error) => {
        alert("비밀번호가 맞지 않습니다. 다시 확인해 주세요");
      });
  };

  const [passwordShow, setPasswordShow] = React.useState(false);

  const togglePasswordVisibility = () => setPasswordShow(!passwordShow);

  return (
    <>
      <FormTitle>
        <FormText>비밀번호 변경</FormText>
      </FormTitle>
      <ThemeProvider theme={theme}>
        <UserInfoForm>
          <Content>
            <Label>
              <Font>기존 비밀번호</Font>
            </Label>
            <CssTextField
              focuscolor="#00C4B4"
              onChange={(e) => {
                setCurPw(e.target.value);
              }}
              required
              multiLine
              variant="outlined"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              id="curPassword"
              name="curPassword"
              placeholder="비밀번호(4글자 이상)*"
              error={curPasswordError !== "" || false}
              InputProps={{

                endAdornment: (
                  <InputAdornment position="absolute">
                    <IconButton
                      style={{ color: "white", height: "33px" }}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Content>

          <ErrorMessage>
            {curPasswordError && (
              <span style={{ fontSize: "14px", color: "orange" }}>
                {curPasswordError}
              </span>
            )}
          </ErrorMessage>
          <Content>
            <Label>
              <Font>새 비밀번호</Font>
            </Label>
            <CssTextField
              focuscolor="#00C4B4"
              onChange={(e) => {
                setPw(e.target.value);
              }}
              required
              variant="outlined"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="새 비밀번호(4글자 이상)*"
              error={passwordError !== "" || false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="absolute">
                    <IconButton
                      style={{ color: "white", height: "33px" }}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Content>
          <ErrorMessage>
            {passwordError && (
              <span style={{ fontSize: "14px", color: "orange" }}>
                {passwordError}
              </span>
            )}
          </ErrorMessage>
          <Content>
            <Label>
              <Font>새 비밀번호 확인</Font>
            </Label>
            <CssTextField
              focuscolor="#00C4B4"
              onChange={(e) => {
                setPwCheck(e.target.value);
              }}
              required
              variant="outlined"
              fullWidth
              type={values.showPassword ? "text" : "password"}
              id="passwordCheck"
              name="passwordCheck"
              placeholder="새 비밀번호 확인(4글자 이상)*"
              error={passwordCheckError !== "" || false}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="absolute">
                    <IconButton
                      style={{ color: "white", height: "33px" }}
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Content>
          <ErrorMessage>
            {passwordCheckError && (
              <span style={{ fontSize: "14px", color: "orange" }}>
                {passwordCheckError}
              </span>
            )}
          </ErrorMessage>
          <div style={{ width: "96%", textAlign: "right" }}>
            <Button
              onClick={() => {
                editPwd();
              }}
            >
              변경 내용 저장
            </Button>
          </div>
        </UserInfoForm>
      </ThemeProvider>
    </>
  );
}
export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 50px 10px 50px;
`;

const UserInfoForm = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 0px;
  height: 100%;
`;

const Button = styled.button`
  width: 150px;
  height: 60px;
  background-color: #00c4b4;
  color: white;
  border-radius: 43px;
  border: none;
  position: relative;
  margin-bottom: 10px;
`;
export default EditPwd;
