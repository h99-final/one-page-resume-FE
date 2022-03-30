import React, { useDebugValue, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import {
  Content,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  Star,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import FileUpload from "../shared/ImageUpload";
import { apis } from "../../../shared/axios";
import PreviousNext from "../shared/PreviousNext";
import Template from "../shared/Template";
//redux
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";
import { useHistory } from "react-router-dom";

function UserInfo() {
  const defaultValues = {};
  const dispatch = useDispatch();
  const history = useHistory();
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
    const stack = userInfo.stack;
    const _data = { ...data };
    apis
      .addInfo(_data)
      .then((res) => {
        // sessionStorage.setItem("userInfo", JSON.stringify(_data));
        dispatch(userActions.userInfoDB());
      })
      .then(() => {
        history.push(`/write/portfolio/stack/${userInfo.porfId}`);
      })
      .catch((error) => {});
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
        setValue("");
      });

    return () => handleSubmit(onValid);
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>내 정보</FormText>
      </FormTitle>
      <UserInfoForm onSubmit={handleSubmit(onValid)}>
        <Content>
          <Label>
            <Font>
              이름(실명)<Star>*</Star>
            </Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none" }}
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
                style={{ border: "none" }}
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
            <Font style={{ marginTop: "55px" }}>프로필 이미지</Font>
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
                style={{ border: "none" }}
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
            <Font>
              이메일<Star>*</Star>
            </Font>
          </Label>
          <Controller
            render={({ field }) => (
              <ReadOnly
                style={{
                  background: "#282933",
                  color: "#424453",
                  border: "none",
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
            <Font>
              GitHub URL<Star>*</Star>
            </Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                style={{ border: "none" }}
                {...field}
                defaultValue={data?.gitUrl}
              />
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
                style={{ border: "none" }}
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
        <br />
        <PreviousNext onClick={handleSubmit(onValid)} />
        <Template />
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

export const ReadOnly = styled.textarea`
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #696b7b;
  }
  width: 1120px;
  height: 19px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  resize: none;
  border: 1px solid #393a47;
  background-color: #393a47;
  color: ${(props) => (props.readOnly ? "white" : "white")};
  &:focus {
    outline: #282933 !important;
    border: 1px solid #282933 !important;
  }
`;
export default UserInfo;
