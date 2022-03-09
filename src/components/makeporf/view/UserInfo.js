import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import {
  Content,
  FormText,
  FormTitle,
  InputCustom,
  Label,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import FileUpload from "../shared/ImageUpload";
import { apis } from "../../../shared/axios";

function UserInfo() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const [data, setData] = useState({});

  const onValid = (data) => {
    console.log(data);
  };

  useEffect(() => {
    apis.userInfo().then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>내 정보</FormText>
      </FormTitle>
      <UserInfoForm onSubmit={handleSubmit(onValid)}>
        <Content>
          <Label>
            <Font>*이름(실명)</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
                defaultValue={data.name}
              />
            )}
            name="name"
            control={control}
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
                defaultValue={data.job}
              />
            )}
            name="job"
            control={control}
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
                defaultValue={data.phoneNum}
              />
            )}
            name="phone"
            control={control}
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
                defaultValue={data.email}
              />
            )}
            name="email"
            control={control}
          />
        </Content>
        <Content>
          <Label>
            <Font>GitHub URL</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none", background: "white" }}
                {...field}
                defaultValue={data.gitUrl}
              />
            )}
            name="gitUrl"
            control={control}
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
                defaultValue={data.blogUrl}
              />
            )}
            name="blogUrl"
            control={control}
          />
        </Content>
        <input type="submit" />
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

export default UserInfo;
