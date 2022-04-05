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
  Star,
} from "../makeporf/shared/_sharedStyle";
import { apis } from "../../shared/axios";
import FileUpload from "../makeporf/shared/ImageUpload";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actionCreators } from '../../redux/modules/user';

function ChangeInfo() {
  const history = useHistory()
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
  const dispatch = useDispatch()
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const onValid = (data) => {
    const stack = userInfo.stack;
    const _data = { ...data, stack };
    apis
      .addInfo(_data)
      .then((res) => {
        dispatch(actionCreators.userInfoDB())
        window.alert("변경 완료");
        history.push('/mypage')
      })
      .catch((error) => {
        window.alert(error.response.data.data.errors[0].message);
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
        <FormText>기본 정보</FormText>
      </FormTitle>
      <UserInfoForm onSubmit={handleSubmit(onValid)}>
        <Content>
          <Label>
            <Font>이름(실명)<Star>*</Star></Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                {...field}
                errors={!!errors.name}
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
                maxLength={13}
                errors={!!errors.phoneNum}
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
            <Font>이메일<Star>*</Star></Font>
          </Label>
          <Controller
            render={({ field }) => (
              <ReadOnly
                style={{
                  border: "none",
                  background: "#282933",
                  color: "#424453",

                }}
                {...field}
                readOnly
              />
            )}
            // rules={{
            //   pattern: {
            //     value:
            //       /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
            //     message: "이메일 형식이 아닙니다.",
            //   },
            // }}
            name="email"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.email?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>GitHub URL<Star>*</Star></Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom {...field}
                errors={!!errors.gitUrl}
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
                {...field}
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

        <div style={{
          position: "absolute", marginTop: "60px", maxWidth: "1440px",
          width: "95%", textAlign: "right", paddingBottom: "30px"
        }}>
          <Button type="submit" >변경 내용 저장</Button>
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
  cursor: pointer;
  width: 150px;
  height: 60px;
  background-color: #00c4b4;
  color: white;
  border-radius: 43px;
  border: none;
  position: relative;
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
export default ChangeInfo;
