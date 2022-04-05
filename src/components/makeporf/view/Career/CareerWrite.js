import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { styled as style } from '@mui/styles';
import { Content, ContentCareer } from "../../shared/_sharedStyle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Font } from "../Introduce";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as careerActions } from "../../../../redux/modules/career";
import { Checkbox } from "@mui/material";
import Template from "../../shared/Template";

const BpIcon = style('span')(({ theme }) => ({
  borderRadius: 3,
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = style(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
      " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
      "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

const CareerWrite = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm();

  const content = useRef(null);

  useEffect(() => {
    if (content === null || content.current === null) {
      return;
    }
    content.current.style.height = "20px";
    content.current.style.height = content.current.scrollHeight + "px";

    // return handleSubmit(careerSubmit);
  }, []);

  const handleResizeHeight = useCallback(() => {
    if (content === null || content.current === null) {
      return;
    }
    content.current.style.height = "38px";
    content.current.style.height = content.current.scrollHeight + "px";
  }, []);

  const [open, setOpen] = useState(true);
  const [checkDate, setCheckDate] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheckClick = () => {
    if (checked === false) {
      setValue("endTime", "current");
    } else {
      setValue("endTime", "");
    }
    setChecked((prev) => !prev);
  };

  const careerSubmit = (oldData) => {
    if (open === false) {
      setOpen((prev) => !prev);
      return;
    }
    if (oldData.contents.length === 0) {
      setError("contents", "필수 항목 입니다.");
      return;
    }
    let _content = oldData.contents.split(`\n`);
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
    setOpen(true);
    setChecked(false);
  };

  useEffect(() => {
    return () => handleSubmit(careerSubmit);
  }, []);

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
                  {...field}
                  maxLength={50}
                  placeholder="학교, 회사, 부트캠프, 교육, 자격증, 공모전 등 활동 종류를 적어주세요."
                  errors={!!errors.title}
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
                  errors={!!errors.subTitle}
                  type="text"
                  {...field}
                  maxLength={50}
                  placeholder="학교/회사 이름, 부트캠프 기업명, 자격증명, 공모전 이름 등 활동의 이름을 적어주세요. (ex: 한국대학교 컴퓨터공학과, 항해99)"
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
                  errors={!!errors.contents}
                  type="text"
                  style={{ height: "40px" }}
                  {...field}
                  ref={content}
                  onInput={handleResizeHeight}
                  placeholder="활동에서 담당한 역할, 프로젝트 등 직무 내용을 작성해주세요."
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
                  errors={!!errors.startTime}
                  style={{
                    marginRight: "10px",
                  }}
                  {...field}
                  placeholder="YYYY-MM"
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
            <div style={{ color: "white", margin: "auto 0px" }}>~</div>
            <Controller
              render={({ field }) => (
                <InputCustomDate
                  type="text"
                  errors={!!errors.endTime}
                  style={{
                    marginLeft: "10px",
                  }}
                  {...field}
                  placeholder="YYYY-MM"
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
              sx={{
                '&:hover': { bgcolor: 'transparent' },
              }}

              disableRipple
              color="default"
              checkedIcon={<BpCheckedIcon />}
              icon={<BpIcon />}
              id="current"
              checked={checked}
              onClick={handleCheckClick}
            />
            <Label htmlFor="current" style={{ color: "white" }}>
              활동을 진행하고 있어요
            </Label>
          </Content>
          <ErrorMessage>
            {errors?.endTime?.message || errors?.startTime?.message}
          </ErrorMessage>

          <Template careerSubmit={handleSubmit(careerSubmit)} />
        </form>
      ) : null}

      {/* <AddButton > */}
      <Btn onClick={handleSubmit(careerSubmit)} style={{ cursor: "pointer" }}>
        <img alt="" src={process.env.PUBLIC_URL + "/img/plus.svg"} />
      </Btn>
      {/* </AddButton> */}
    </>
  );
};

const InputCustomDate = styled(InputCustom)`
  width: 8vw;
`;

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
const Btn = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 70px;
  margin-bottom: 70px;
`;
export default CareerWrite;
