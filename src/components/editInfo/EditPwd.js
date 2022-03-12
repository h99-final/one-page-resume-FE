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
} from "../makeporf/shared/_sharedStyle";

import { TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { Font } from '../makeporf/view/Introduce';

function ChangeInfo() {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))



  const [password, setPw] = React.useState("");
  const [passwordCheck, setPwCheck] = React.useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const editPwd = () => {
    if (!password || password.length < 4) {
      setPasswordError(
        "비밀번호 입력란을 다시 확인해주세요! 비밀번호는 4자리 이상입니다"
      );
    }
    setPasswordError("");
    // 비밀번호와 비밀번호 확인 부분이 일치하나 확인!
    if (password !== passwordCheck) {
      setPasswordCheckError("패스워드와 패스워드 확인이 일치하지 않습니다!");

    }
    setPasswordCheckError("");


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
      <FormTitle>
        <FormText>기본 정보</FormText>
      </FormTitle>
      <UserInfoForm >
        <Content>
          <Label>
            <Font>현재 비밀번호</Font>
          </Label>
          <TextField
            id="standard-read-only-input"
            defaultValue={userInfo.email}
            fullWidth
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </Content>
        <Content>
          <Label>
            <Font>새 비밀번호</Font>
          </Label>
          <TextField
            style={{}}
            onChange={(e) => {
              setPw(e.target.value);
            }}
            required
            variant="outlined"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="비밀번호(4글자 이상)*"
            error={passwordError !== "" || false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
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
            <span style={{ fontSize: "12px", color: "red" }}>
              {passwordError}
            </span>
          )}

        </Content>
        <Content>
          <Label>
            <Font>새 비밀번호 확인</Font>
          </Label>
          <TextField
            style={{}}
            onChange={(e) => {
              setPwCheck(e.target.value);
            }}
            required
            variant="outlined"
            fullWidth
            type={values.showPassword ? "text" : "password"}
            id="passwordcheck"
            name="passwordcheck"
            placeholder="비밀번호 재입력*"
            error={passwordCheckError !== "" || false}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
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
            <span style={{ fontSize: "12px", color: "red" }}>
              {passwordCheckError}
            </span>
          )}
        </Content>

        <div style={{ width: "96%", textAlign: "right" }}>
          <Button
            disabled={!passwordCheck || !password ? true : false}
            onClick={() => { editPwd() }}
          >
            변경 내용 저장
          </Button>
        </div>

      </UserInfoForm>
    </>
  );
}
export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px 0px 50px;
`;

const UserInfoForm = styled.form`
  flex-direction: column;
  align-items: center;
  padding: 0px;
  height: 100%;
`;

const Button = styled.button`
  width: 150px;
  height: 60px;
  background-color: #333333;
  color: white;
  border-radius: 43px;
  border: none;
  position: relative;
  margin-bottom: 10px;
`;
export default ChangeInfo;
