import React, { useEffect, useRef, useState } from "react";
import {
  AddButton,
  ButtonText,
  ContentForm,
  InputCustom,
  MakeCenter,
  Label
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

const CareerWrite = () => {
  const dispatch = useDispatch();
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ defaultValues });

  //   const contents = useSelector((state) => state.careerContent.contents);
  const contents = useSelector((state) => state.careerContent.contents);
  const content = useRef();

  const careerSubmit = (oldData) => {
    let _content = [];
    contents.map((e) => _content.push(e.content));
    let _data = { ...oldData, contents: _content };
    dispatch(careerActions.addCareer(_data));
  };

  const contentsAdd = () => {
    dispatch(contentActions.addContent(content.current.value));
    setValue("contents", "");
  };

  // useEffect(() => {
  //   dispatch(contentActions.setContent(contents));
  // }, [contents]);

  return (
    <>
      <form onSubmit={handleSubmit(careerSubmit)}>
        {/* <IconBox>
            <DeleteForeverIcon />
          </IconBox> */}
        <Content >
          <Label>
            <Font>직무 카테고리</Font>
          </Label>
          <Controller
            render={({ field }) => (
              <InputCustom
                type="text"
                style={{ border: "none", background: "white" }}
                {...field}
              />
            )}
            name="title"
            control={control}
          />
        </Content>
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
              />
            )}
            name="subTitle"
            control={control}
          />
        </Content>
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
              />
            )}
            name="contents"
            control={control}
          // defaultValue="abc"
          />

          <span onClick={contentsAdd}>+</span>
        </MultiContent>
        {contents.map((e, i) => {
          return (
            <CareerContent
              key={i}
              content={e.content}
              id={e.id}
              index={i}
            />
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
            name="startTime"
            control={control}
          />
          <div>~</div>
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
            name="endTime"
            control={control}
          />
        </Content>
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

const InputCustomTextarea = styled(InputCustom)``;
export const MultiContent = styled.div`
display: flex;
flex-direction: row;
margin: 0px 50px;
  span{
    align-items: center;
    flex-direction: row;
    display: flex;
    height: 70px;
  }
`;
export default CareerWrite;
