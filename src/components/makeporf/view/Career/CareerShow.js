import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AddButton,
  ButtonText,
  ContentCareer,
  ContentForm,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  MakeCenter,
} from "../../shared/_sharedStyle";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Content, Font, FormContents } from "../Introduce";
import { useForm, Controller } from "react-hook-form";
// import CareerContent from "./CareerContent";
import { useDispatch } from "react-redux";
import { actionCreators as careerActions } from "../../../../redux/modules/career";
import { MultiContent } from "./CareerWrite";

function CareerShow(props) {
  const dispatch = useDispatch();
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm({ defaultValues });

  const { title, subTitle, contents, startTime, endTime, id } = props;

  const [update, setUpdate] = useState(false);

  function handleDelete() {
    dispatch(careerActions.deleteCareerDB(id));
  }

  function handleUpdate() {
    setUpdate(true);
  }
  const content = useRef();

  const careerSubmit = (oldData) => {
    if (update) {
      let _content = content.current.value.split(`\n`);
      let _data = {
        ...oldData,
        contents: _content,
        startTime: oldData.startTime + "-01",
        endTime: oldData.endTime + "-01",
      };
      dispatch(careerActions.updateCareerDB(id, _data));
      setValue("title", "");
      setValue("contents", "");
      setValue("subTitle", "");
      setValue("startTime", "");
      setValue("endTime", "");
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };

  // useEffect(() => {
  //   setValue("title", title);
  //   setValue("contents", contents);
  //   setValue("subTitle", subTitle);
  //   setValue("startTime", startTime);
  //   setValue("endTime", endTime);
  // }, [update]);

  if (update) {
    return (
      <>
        <form>
          {/* <form onSubmit={handleSubmit(careerSubmit)}> */}
          {/* <IconBox>
            <DeleteForeverIcon onClick={handleSubmit(careerSubmit)} />
          </IconBox> */}
          <IconBox>
            <DeleteForeverIcon onClick={handleDelete} />
          </IconBox>
          <MultiContent>
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
                  defaultValue={title}
                />
              )}
              rules={{
                required: "필수 항목 입니다.",
              }}
              name="title"
              control={control}
            />
            <ErrorMessage>{errors?.title?.message}</ErrorMessage>
          </MultiContent>
          <MultiContent>
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
                  defaultValue={subTitle}
                />
              )}
              rules={{
                required: "필수 항목 입니다.",
              }}
              name="subTitle"
              control={control}
            />
            <ErrorMessage>{errors?.subTitle?.message}</ErrorMessage>
          </MultiContent>
          <MultiContent>
            <Label>
              <Font>직무 내용(0/100)</Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustomCareer
                  type="text"
                  style={{ marginBottom: "20px" }}
                  {...field}
                  ref={content}
                  defaultValue={contents?.join("\n")}
                />
              )}
              name="contents"
              control={control}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <ErrorMessage>{errors?.contents?.message}</ErrorMessage>
            </div>
          </MultiContent>
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
                  defaultValue={startTime}
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
                  defaultValue={endTime}
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
            <ErrorMessage>{errors?.endTime?.message}</ErrorMessage>
          </Content>
        </form>
      </>
    );
  } else {
    return (
      <>
        <hr style={{ margin: "50px" }} />
        <FormContents>
          <IconBox>
            <DeleteForeverIcon onClick={handleDelete} />
          </IconBox>
          <Content style={{ marginBottom: "40px" }}>
            <Label>
              <Font>직무 카테고리</Font>
            </Label>
            <InputCustom
              type="text"
              style={{ border: "none" }}
              defaultValue={title}
            />
          </Content>
          <Content style={{ marginBottom: "40px" }}>
            <Label>
              <Font>직무 경험</Font>
            </Label>
            <InputCustom
              type="text"
              style={{ border: "none" }}
              defaultValue={subTitle}
            />
          </Content>
          <MultiContent style={{ marginBottom: "40px" }}>
            <Label>
              <Font>직무 내용(0/100)</Font>
            </Label>
            <InputCustomCareer
              type="text"
              style={{ border: "none" }}
              defaultValue={contents?.join("\n")}
            />
          </MultiContent>
          <Content style={{ marginBottom: "30px" }}>
            <Label>
              <Font>활동 기간</Font>
            </Label>

            <InputCustomDate
              rows={1}
              type="text"
              style={{
                border: "none",
                marginRight: "10px",
              }}
              defaultValue={startTime?.slice(0, 7)}
            />

            <div>~</div>

            <InputCustomDate
              type="text"
              style={{
                border: "none",
                marginLeft: "10px",
              }}
              defaultValue={endTime?.slice(0, 7)}
            />
          </Content>
        </FormContents>
      </>
    );
  }
}

const InputCustomCareer = styled(InputCustom)`
  height: 200px !important;
`;

const InputCustomDate = styled(InputCustom)`
  width: 8vh;
`;

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 45px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 50px;
  margin-right: 50px;
  margin-bottom: 10px;
`;

const Message = styled(ErrorMessage)`
  color: #000;
`;

const InputCustomTextarea = styled(InputCustom)``;

export default CareerShow;
