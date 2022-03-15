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
import { Content, ContentCareer } from "../../shared/_sharedStyle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Font } from "../Introduce";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as careerActions } from "../../../../redux/modules/career";
import { Checkbox } from "@mui/material";

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

  const content = useRef();

  const [open, setOpen] = useState(false);
  const [checkDate, setCheckDate] = useState(false);

  const handleCheckClick = () => {
    if (checkDate === false) {
      setValue("endTime", "current");
    } else {
      setValue("endTime", "");
    }
    setCheckDate((prev) => !prev);
  };

  const careerSubmit = (oldData) => {
    if (open === false) {
      setOpen((prev) => !prev);
      return;
    }
    if (content.current.value.length === 0) {
      setError("contents", "필수 항목 입니다.");
    }
    let _content = content.current.value.split(`\n`);
    let _endTime = oldData.endTime;
    if (oldData.endTime !== "current") {
      _endTime = oldData.endTime + "-01";
    }

    let _data = {
      ...oldData,
      contents: _content,
      startTime: oldData.startTime + "-01",
      endTime: _endTime,
    };
    dispatch(careerActions.addCareerDB(_data));
    setValue("title", "");
    setValue("contents", "");
    setValue("subTitle", "");
    setValue("startTime", "");
    setValue("endTime", "");
    setOpen((prev) => !prev);
    setCheckDate((prev) => !prev);
  };

  return (
    <>
      {open ? (
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
                  style={{ height: "40px" }}
                  {...field}
                  ref={content}
                />
              )}
              rules={{
                required: "필수 항목 입니다.",
              }}
              name="contents"
              control={control}
            />
          </MultiContent>
          <ErrorMessage>{errors?.contents?.message}</ErrorMessage>
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
                  value: /^\d{4}-(0[1-9]|1[012])|current$/,
                  message: "날짜 형식을 맞춰주세요 YYYY-MM",
                },
              }}
              name="endTime"
              control={control}
            />
            <Checkbox
              // sx={{ backgroundColor: "white" }}
              id="current"
              onClick={handleCheckClick}
            />
            <Label htmlFor="current">활동을 진행하고 있어요</Label>
          </Content>
          <ErrorMessage>{errors?.endTime?.message}</ErrorMessage>
        </form>
      ) : null}

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
    flex-direction: column;
    display: flex;
    height: 70px;
  }
`;
export default CareerWrite;
