import React, { useEffect, useRef, useState } from "react";
import {
  AddButton,
  ButtonText,
  ContentForm,
  InputCustom,
  MakeCenter,
  Label,
  ErrorMessage,
} from "../../shared/_sharedStyle";
import styled from "styled-components";
import { FormContents } from "../Introduce";
import { Content, ContentCareer } from "../../shared/_sharedStyle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Font } from "../Introduce";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as contentActions } from "../../../../redux/modules/careerContent";
import { actionCreators as careerActions } from "../../../../redux/modules/career";
import CareerContent from "./CareerContent";
import { flexbox } from "@mui/system";

const CareerWrite = () => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm({ defaultValues });

  const contents = useSelector((state) => state.careerContent.contents);
  const content = useRef();

  const careerSubmit = (oldData) => {
    let _content = [];
    contents.map((e) => _content.push(e.content));
    let _data = {
      ...oldData,
      contents: _content,
      startTime: oldData.startTime + "-01",
      endTime: oldData.endTime + "-01",
    };
    dispatch(careerActions.addCareerDB(_data));
    dispatch(contentActions.setContent([]));
    setValue("title", "");
    setValue("contents", "");
    setValue("subTitle", "");
    setValue("startTime", "");
    setValue("endTime", "");
  };

  const contentsAdd = () => {
    if (content.current.value === "") {
      setError(
        "contents",
        { message: "직무 내용을 입력해주세요" },
        { shouldFocus: true }
      );
      return;
    }
    dispatch(contentActions.addContent(content.current.value));

    setValue("contents", "");
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      contentsAdd();
    }
  };

  console.log(contents);

  return (
    <>
      <form onSubmit={handleSubmit(careerSubmit)}>
        <Content>
          <Label>
            <Font>직무 카테고리</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                type="text"
                style={{ border: "none", background: "white" }}
                {...field}
                maxLength={50}
              />
            )}
            rules={{
              required: "필수 항목 입니다.",
            }}
            name="title"
            control={control}
          />
        </Content>

        <ErrorMessage>{errors?.title?.message}</ErrorMessage>
        <Content>
          <Label>
            <Font>직무 경험</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                type="text"
                style={{ border: "none", background: "white" }}
                {...field}
                maxLength={50}
              />
            )}
            rules={{
              required: "필수 항목 입니다.",
            }}
            name="subTitle"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.subTitle?.message}</ErrorMessage>
        <MultiContent>
          <Label>
            <Font>직무 내용(0/100)</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                type="text"
                style={{ marginBottom: "20px", height: "40px" }}
                {...field}
                ref={content}
                onKeyPress={onCheckEnter}
              />
            )}
            name="contents"
            control={control}
          />

          <Message onClick={contentsAdd}>내용<br />추가</Message>
        </MultiContent>


        <ErrorMessage>{errors?.contents?.message}</ErrorMessage>

        {contents.map((e, i) => {
          return (
            <CareerContent key={i} content={e.content} id={e.id} index={i} />
          );
        })}
        <Content>
          <Label style={{ minWidth: "150px" }}>
            <Font>활동 기간</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustomDate
                type="text"
                style={{
                  border: "none",
                  background: "white",
                  marginRight: "10px",
                }}
                {...field}
              />
            )}
            rules={{
              required: "필수 항목 입니다.",
              pattern: {
                value: /^\d{4}-(0[1-9]|1[012])$/,
                message: "날짜 형식을 맞춰주세요 YYYY-MM",
              },
            }}
            name="startTime"
            control={control}
          />
          <Font>~</Font>
          <Controller
            render={({ field }) => (
              <InputCustomDate
                type="text"
                style={{
                  border: "none",
                  background: "white",
                  marginLeft: "10px",
                }}
                {...field}
              />
            )}
            rules={{
              required: "필수 항목 입니다.",
              pattern: {
                value: /^\d{4}-(0[1-9]|1[012])$/,
                message: "날짜 형식을 맞춰주세요 YYYY-MM",
              },
            }}
            name="endTime"
            control={control}
          />
        </Content>
        <ErrorMessage>{errors?.endTime?.message}</ErrorMessage>
      </form>
      <MakeCenter style={{ marginTop: "20px" }}>
        <AddButton onClick={handleSubmit(careerSubmit)}>
          <ContentCareer>
            <ButtonText>+ 직무 경험 추가 하기</ButtonText>
          </ContentCareer>
        </AddButton>
      </MakeCenter>
    </>
  );
};

const InputCustomDate = styled(InputCustom)`
  width: 8vw;
`;

const Message = styled.span`
  font-size: 10px;
  color: #000;
`;

const InputCustomTextarea = styled(InputCustom)``;
export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px;
  span {
    align-items: center;
    flex-direction: row;
    display: flex;
    height: 70px;
  }
`;
export default CareerWrite;
