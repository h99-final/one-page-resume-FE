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
import { SettingsOverscanOutlined } from "@mui/icons-material";
import { useSelector } from "react-redux";

function UserInfo() {
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

  const userInfo = useSelector((state) => state.user.user);

  const onValid = (data) => {
    const stack = userInfo.stack;
    const _data = { ...data, stack };
    apis.addInfo(_data).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    apis
      .userInfo()
      .then((res) => {
        const { name, job, phoneNum, gitUrl, email, blogUrl } = res.data.data;
        setData(res.data.data);
        setValue("name", name);
        setValue("job", job);
        setValue("phoneNum", phoneNum);
        setValue("gitUrl", gitUrl);
        setValue("email", email);
        setValue("blogUrl", blogUrl);
      })
      .catch((error) => {
        setValue(null);
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
                defaultValue={data?.name}
              />
            )}
            onChange={onChange}
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
                defaultValue={data?.job}
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
                defaultValue={data?.phoneNum}
              />
            )}
            name="phoneNum"
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
                defaultValue={data?.email}
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
                defaultValue={data?.gitUrl}
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
                defaultValue={data?.blogUrl}
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
