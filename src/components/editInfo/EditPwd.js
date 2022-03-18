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

function ChangeInfo() {
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

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const onValid = (data) => {
    const stack = userInfo.stack;
    const _data = { ...data, stack };
    apis.addInfo(_data).then((res) => { });
  };

  useEffect(() => {
    apis
      .userInfo()
      .then((res) => {

      })
      .catch((error) => {
      });
  }, []);

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
              <InputCustom {...field} />
            )}
            rules={{

            }}
            name="password"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.gitUrl?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>*새 비밀번호</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field} />
            )}
            rules={{

            }}
            name="password"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.gitUrl?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>*새 비밀번호 확인</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field} />
            )}
            rules={{

            }}
            name="password"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.gitUrl?.message}</ErrorMessage>
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
export default ChangeInfo;
