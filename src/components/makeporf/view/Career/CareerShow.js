import React, { useEffect, useRef, useState } from "react";
import {
  ContentForm,
  FormText,
  FormTitle,
  InputCustom,
  Label,
} from "../../shared/_sharedStyle";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Content, Font, FormContents } from "../Introduce";
import { useForm, Controller } from "react-hook-form";
import CareerContent from "./CareerContent";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as careerActions } from "../../../../redux/modules/career";
import { MultiContent } from './CareerWrite';

function CareerShow(props) {
  const dispatch = useDispatch();

  const { title, subTitle, contents, startTime, endTime, index } = props;

  function handleDelete() {
    dispatch(careerActions.deleteCareer(index));
  }

  return (
    <>
      <FormContents>
        <IconBox>
          <DeleteForeverIcon onClick={handleDelete} />
        </IconBox>
        <Content>
          <Label>
            <Font>직무 카테고리</Font>
          </Label>
          <InputCustom
            type="text"
            style={{ border: "none", background: "white" }}
            defaultValue={title}
          />
        </Content>
        <Content>
          <Label>
            <Font>직무 경험</Font>
          </Label>
          <InputCustom
            type="text"
            style={{ border: "none", background: "white" }}
            defaultValue={subTitle}
          />
        </Content>
        <MultiContent>
          <Label>
            <Font>직무 내용(0/100)</Font>
          </Label>

          {contents?.map((e, i) => {
            return <CareerContent key={i} content={e} index={i} />;
          })}
        </MultiContent>
        <Content
        >
          <Label>
            <Font>활동 기간</Font>
          </Label>

          <InputCustomDate
            type="text"
            style={{
              border: "none",
              background: "white",
              marginRight: "10px",
            }}
            defaultValue={startTime}
          />

          <div>~</div>

          <InputCustomDate
            type="text"
            style={{
              border: "none",
              background: "white",
              marginLeft: "10px",
            }}
            defaultValue={endTime}
          />
        </Content>
      </FormContents>
    </>
  );
}

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
`;

export default CareerShow;
