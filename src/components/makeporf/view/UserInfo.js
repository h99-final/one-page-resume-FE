import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import {
  Content,
  FormText,
  FormTitle,
  InputCustom,
  Label,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import FileUpload from "../shared/ImageUpload";
import { border } from '@mui/system';

function UserInfo() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  useEffect(() => {
    console.log("axios 개인 정보 가져오기");
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>내 정보</FormText>
      </FormTitle>
      <UserInfoForm>
        <Content>
          <Label>
            <Font>*이름(실명)</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="name"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <Content>
          <Label>
            <Font>직무</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="job"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <MultiContent>
          <Label style={{ minWidth: "150px" }}>
            <Font>프로필 이미지</Font>
          </Label>
          <FileUpload />
        </MultiContent>
        <Content>
          <Label>
            <Font>전화번호</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="phone"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <Content>
          <Label>
            <Font>이메일</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ background: "white" }}

                {...field}

              />
            )}
            name="email"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <Content>
          <Label >
            <Font>GitHub URL</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="gitUrl"
            control={control}
            defaultValue="abc"
          />
        </Content>
        <Content>
          <Label>
            <Font>Blog URL</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="blogUrl"
            control={control}
            defaultValue="abc"
          />
        </Content>
      </UserInfoForm>

    </>
  );
}
export const MultiContent = styled.div`
display: flex;
flex-direction: row;
margin: 0px 50px 0px 50px;
`;

const UserInfoForm = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 0px;
  height: 100%;
`;


export default UserInfo;
