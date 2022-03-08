import React, { useEffect, useRef, useState } from "react";
import {
  ContentForm,
  FormText,
  FormTitle,
  InputCustom,
} from "../../shared/_sharedStyle";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Content, Font, FormContents, Label } from "../Introduce";
import { useForm, Controller } from "react-hook-form";
import CareerContent from "./CareerContent";
import { useDispatch, useSelector } from "react-redux";

function CareerShow(props) {
  const dispatch = useDispatch();

  const { title, subTitle, contents, startTime, endTime } = props;

  return (
    <>
      <FormContents>
        <ContentCareer>
          <IconBox>
            <DeleteForeverIcon />
          </IconBox>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Label>
              <Font>직무 카테고리</Font>
            </Label>
            <InputCustom
              type="text"
              style={{ border: "none", background: "white" }}
              defaultValue={title}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Label>
              <Font>직무 경험</Font>
            </Label>
            <InputCustom
              type="text"
              style={{ border: "none", background: "white" }}
              defaultValue={subTitle}
            />
          </div>
          <div style={{ display: "flex" }}>
            <Label>
              <Font>직무 내용(0/100)</Font>
            </Label>
            <ContentForm>
              {contents?.map((e, i) => {
                return <CareerContent key={i} content={e} index={i} />;
              })}
            </ContentForm>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
          </div>
          <input type="submit" />
        </ContentCareer>
      </FormContents>
    </>
  );
}

const InputCustomDate = styled(InputCustom)`
  width: 8vw;
`;

const ContentCareer = styled(Content)`
  display: flex;
  flex-direction: column;
`;

const InputCustomTextarea = styled(InputCustom)``;

const FormTitleFlex = styled(FormTitle)`
  display: flex;
  justify-content: flex-start;
`;

const FormTextSpan = styled(FormText)`
  font-size: 16px;
  width: 100%;
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
