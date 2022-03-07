import React from "react";
import { FormText, FormTitle, InputCustom } from "../shared/_sharedStyle";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Content, Font, FormContents, Label } from "./Introduce";
import { useForm, Controller } from "react-hook-form";

function Career() {
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });
  return (
    <>
      <FormTitleFlex>
        <FormText>직무 경험</FormText>
        <FormTextSpan>
          학교, 회사 또는 부트캠프, 교육, 자격증 등을 자유롭게 작성해주세요.
        </FormTextSpan>
      </FormTitleFlex>

      <FormContents>
        <ContentCareer>
          <IconBox>
            <DeleteForeverIcon />
          </IconBox>
          <div style={{ display: "flex" }}>
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
              name="introTitle"
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
              name="introTitle"
              control={control}
              defaultValue="abc"
            />
          </div>
          <div style={{ display: "flex" }}>
            <Label>
              <Font>직무 내용(0/500)</Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustomTextarea
                  type="text"
                  style={{ border: "none", background: "white" }}
                  {...field}
                />
              )}
              name="introTitle"
              control={control}
              defaultValue="abc"
            />
          </div>
          <div style={{ display: "flex" }}>
            <Label>
              <Font>활동 기간</Font>
            </Label>
            <Date>
              {/* <Controller
                render={({ field }) => (
                  <InputCustom
                    type="date"
                    style={{ border: "none", background: "white" }}
                    {...field}
                  />
                )}
                name="introContents"
                control={control}
                defaultValue="abc"
              /> */}
              <input type="date" />
            </Date>
          </div>
        </ContentCareer>
      </FormContents>
    </>
  );
}

const Date = styled.div`
  display: flex;
  width: 14vw;
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
  margin-bottom: 1vw;
  width: 45px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 50px;
`;

export default Career;