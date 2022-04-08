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

  const { title, subTitle, contents, startTime, endTime, id } = props;

  function handleDelete() {
    dispatch(careerActions.deleteCareerDB(id));
  }

  return (
    <>
      <FormContents>
        <IconBox onClick={handleDelete}>
          <img alt="" src={process.env.PUBLIC_URL + "/img/Trash.svg"} />
        </IconBox>
        <Content style={{ marginBottom: "40px" }}>
          <Label>
            <Font>직무 카테고리</Font>
          </Label>
          <InputCustom
            type="text"
            style={{ border: "none" }}
            value={title}
            readOnly
          />
        </Content>
        <Content style={{ marginBottom: "40px" }}>
          <Label>
            <Font>직무 경험</Font>
          </Label>
          <InputCustom
            type="text"
            style={{ border: "none" }}
            value={subTitle}
            readOnly
          />
        </Content>
        <MultiContent style={{ marginBottom: "40px" }}>
          <Label>
            <Font>직무 내용(0/100)</Font>
          </Label>
          <InputCustomCareer
            type="text"
            style={{ border: "none" }}
            value={contents?.join("\n")}
            readOnly
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
            value={startTime?.slice(0, 7)}
            readOnly
          />

          <div style={{ color: "white" }}>~</div>

          <InputCustomDate
            type="text"
            style={{
              border: "none",
              marginLeft: "10px",
            }}
            value={endTime?.slice(0, 7)}
            readOnly
          />
        </Content>
      </FormContents>
      <hr style={{ margin: "50px", border: "1px solid #424453" }} />
    </>
  );
}

const InputCustomCareer = styled(InputCustom)`
  height: 200px !important;
`;

const InputCustomDate = styled(InputCustom)`
  width: 8vh;
`;

const IconBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 45px;
  height: 45px;
  background-color: #424453;
  border-radius: 50px;
  margin-right: 50px;
  margin-bottom: 20px;
  &:hover {
    background-color: #696b7b;
  }
`;

const Message = styled(ErrorMessage)`
  color: #000;
`;

const InputCustomTextarea = styled(InputCustom)``;

export default CareerShow;
