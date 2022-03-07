import React, { useRef, useState } from "react";
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
import { actionCreators as porfActions } from "../../../../redux/modules/portfolio";

function Career() {
  const dispatch = useDispatch();
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ defaultValues });

  const content = useRef(null);
  const contents = useSelector((state) => state.portfolio.career);
  console.log(contents);
  // const [content, setContent] = useState("");

  const contentsAdd = () => {
    dispatch(porfActions.addCareer(content.current.value));
    setValue("content", "");
  };

  const careerSubmit = (oldData) => {
    console.log(contents);
  };

  return (
    <>
      <FormTitleFlex>
        <FormText>직무 경험</FormText>
        <FormTextSpan>
          학교, 회사 또는 부트캠프, 교육, 자격증 등을 자유롭게 작성해주세요.
        </FormTextSpan>
      </FormTitleFlex>

      <form onSubmit={handleSubmit(careerSubmit)}>
        <FormContents>
          <ContentCareer>
            <IconBox>
              <DeleteForeverIcon />
            </IconBox>
            <div style={{ display: "flex", justifyContent: "center" }}>
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
                name="Title"
                control={control}
                defaultValue="abc"
              />
            </div>
            <div style={{ display: "flex" }}>
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
                defaultValue="abc"
              />
            </div>
            <div style={{ display: "flex" }}>
              <Label>
                <Font>직무 내용(0/100)</Font>
              </Label>
              <ContentForm>
                <Controller
                  render={({ field }) => (
                    <InputCustomTextarea
                      type="text"
                      style={{ border: "none", background: "white" }}
                      {...field}
                      ref={content}
                    />
                  )}
                  name="content"
                  control={control}
                  defaultValue="abc"
                  // value={content}
                  // onChange={(e) => setContent(e.target.value)}
                />
                {contents.map((e, i) => {
                  return <CareerContent key={i} content={e} index={i} />;
                })}
              </ContentForm>
              <div onClick={contentsAdd}>+</div>
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
                defaultValue="abc"
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
                defaultValue="abc"
              />
            </div>
            <input type="submit" />
          </ContentCareer>
        </FormContents>
      </form>
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

export default Career;
