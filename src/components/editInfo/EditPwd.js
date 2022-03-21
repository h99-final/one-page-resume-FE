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
} from "../makeporf/shared/_sharedStyle";
import { apis } from "../../shared/axios";
import FileUpload from "../makeporf/shared/ImageUpload";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
function EditPwd() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    onChange,
    setValue,
  } = useForm({ defaultValues });

  const [data, setData] = useState({});

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const onValid = (data) => {
    const _data = { ...data };
    apis.addInfo(_data).then((res) => { });
  };

  const [passwordShow, setPasswordShow] = React.useState(false);

  const togglePasswordVisibility = () => setPasswordShow(!passwordShow);


  return (
    <>
      <FormTitle>
        <FormText>비밀번호 변경</FormText>
      </FormTitle>
      <UserInfoForm onSubmit={handleSubmit(onValid)}>
        <Content>
          <Label>
            <Font>*기존 비밀번호</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field}
              />
            )}
            rules={{
              required: "필수 항목 입니다.",
              minLength: { value: 4, message: "비밀번호는 4자 이상입니다." },
            }}
            name="curPassword"
            control={control}
            type={passwordShow ? "text" : "password"}
          />
          <InputAdornment position="end">
            <IconButton
              edge="end"
              aria-label='toggle password visibility'
              style={{ color: "white", borderBottom: "1px solid white", borderRadius: "0", height: "33px", }}
              onClick={togglePasswordVisibility}
            >
              {passwordShow ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        </Content>
        <ErrorMessage>{errors?.curPassword?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>*새 비밀번호</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field} />
            )}
            rules={{
              required: "필수 항목 입니다.",
              minLength: { value: 4, message: "비밀번호는 4자 이상입니다." },
            }}
            name="password"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>*새 비밀번호 확인</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field}
              />
            )}

            rules={{
              required: "필수 항목 입니다.",
              minLength: { value: 4, message: "비밀번호 확인이 일치하지 않습니다." },
            }}
            name="passwordCheck"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.passwordCheck?.message}</ErrorMessage>
        <div style={{ width: "96%", textAlign: "right" }}>
          <Button type="submit">변경 내용 저장</Button>
        </div>
      </UserInfoForm>
    </>
  );
}
export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10px 50px 10px 50px;
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
  background-color: #00C4B4;
  color: white;
  border-radius: 43px;
  border: none;
  position: relative;
  margin-bottom: 10px;
`;
export default EditPwd;
