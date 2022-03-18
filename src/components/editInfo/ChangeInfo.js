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
import { apis } from "../../shared/axios";
import { Font } from "../makeporf/view/Introduce";
import FileUpload from "../makeporf/shared/ImageUpload";
import { border } from "@mui/system";

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
    apis.addInfo(_data).then((res) => {});
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
        <FormText>기본 정보</FormText>
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
            rules={{
              required: "필수 항목 입니다.",
              maxLength: { value: 50, message: "이름은 50자 제한입니다." },
            }}
            onChange={onChange}
            name="name"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.name?.message}</ErrorMessage>
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
                maxLength={13}
              />
            )}
            rules={{
              pattern: {
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "전화번호 형식이 아닙니다.",
              },
            }}
            name="phoneNum"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.phoneNum?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>이메일</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{
                  border: "none",
                  background: "#CCCCCC",
                  color: "#999999",
                }}
                {...field}
                defaultValue={data?.email}
                readOnly
              />
            )}
            rules={{
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: "이메일 형식이 아닙니다.",
              },
            }}
            name="email"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>*GitHub URL</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field} defaultValue={data?.gitUrl} />
            )}
            rules={{
              pattern: {
                value:
                  /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/,
                message: "url주소 형식이 아닙니다.",
              },
            }}
            name="gitUrl"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.gitUrl?.message}</ErrorMessage>
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
            rules={{
              pattern: {
                value:
                  /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/,
                message: "url주소 형식이 아닙니다.",
              },
            }}
            name="blogUrl"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.blogUrl?.message}</ErrorMessage>
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