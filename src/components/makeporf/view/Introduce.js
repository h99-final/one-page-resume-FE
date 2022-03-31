import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apis } from "../../../shared/axios";
import {
  InputCustom,
  ErrorMessage,
  StyledInput,
  Star,
} from "../shared/_sharedStyle";
import PreviousNext from "../shared/PreviousNext";
import Template from "../shared/Template";

function Introduce() {
  const defaultValues = {};

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ defaultValues });

  const introSubmit = (data) => {
    apis.introPorf(data).then((res) => {});
    // .catch((error) => {
    //   alert("필수 정보를 입력해주세요.");
    // });
  };

  useEffect(() => {
    apis.userInfo().then((res) => {
      const { porfId } = res.data.data;
      apis.introPorfGet(porfId).then((res) => {
        // alert("저장되었습니다.");
        const { title, contents } = res.data.data;
        setValue("title", title);
        setValue("contents", contents);
      });
    });
    return handleSubmit(introSubmit);
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>포트폴리오 정보</FormText>
      </FormTitle>

      <form onSubmit={handleSubmit(introSubmit)}>
        <FormContents>
          <Content>
            <Label>
              <Font>
                포트폴리오 제목
                <Star>*</Star>
                <br></br>(50자 이내)
              </Font>
            </Label>
            <Controller
              rules={{
                required: "제목을 입력해주세요.",
                maxLength: {
                  value: 50,
                  message: "50자 제한 입니다.",
                },
                minLength: {
                  value: 5,
                  message: "제목이 너무 짧습니다.",
                },
              }}
              name="title"
              control={control}
              render={({ field }) => (
                <InputCustom
                  type="text"
                  {...field}
                  placeholder="유저님을 가장 잘 표현할 수 있는 포트폴리오 제목을 만들어 보세요. 나만의 명함의 소개글이 됩니다."
                  maxLength={50}
                  errors={!!errors.title}
                />
              )}
            />
          </Content>
          {/* <ErrorMessage style={{ paddingBottom: "20px" }}> */}
          <ErrorMessage>{errors?.title?.message}</ErrorMessage>
          <MultiContent>
            <Label>
              <Font>
                포트폴리오 소개글
                <Star>*</Star> <br></br>(2000자 이내)
              </Font>
            </Label>
            <Controller
              rules={{
                required: "소개글을 입력해주세요.",
                maxLength: {
                  value: 2000,
                  message: "500자 제한 입니다.",
                },
                minLength: {
                  value: 50,
                  message: "소개글이 너무 짧습니다.",
                },
              }}
              name="contents"
              control={control}
              render={({ field }) => (
                <InputCustom
                  type="text"
                  style={{
                    height: "200px",
                  }}
                  {...field}
                  placeholder="포트폴리오에서 어떤 매력을 보여주실 건가요? 유저님의 개발 가치관, 개발에 대한 관심도, 장점 등을 작성해 보세요."
                  errors={!!errors.contents}
                />
              )}
            />
          </MultiContent>
          <ErrorMessage>{errors?.contents?.message}</ErrorMessage>
        </FormContents>
        <PreviousNext />
        <Template />
      </form>
    </>
  );
}

const FormTitle = styled.div`
  margin: 50px 60px;
  justify-content: center;
`;

const FormText = styled.div`
  width: 125px;
  height: 24px;
  left: 0px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: white;
`;

export const FormContents = styled.div`
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  height: 100%;
`;

export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 50px 0px 50px;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 200px;
  min-width: 150px;
  height: 49px;
  left: 0px;
`;

export const Font = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* C1 */

  color: #ffffff;
  margin: 10px;
`;

export default Introduce;
