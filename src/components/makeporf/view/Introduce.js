import { InputUnstyled } from "@mui/base";
import { autocompleteClasses, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apis } from "../../../shared/axios";
import { actionCreators as introduceActions } from "../../../redux/modules/introduce";

function Introduce() {
  const defaultValues = {
    fieldObj: {
      introTitle: "",
      introContents: "",
    },
  };
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    setError,
  } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const introduceData = useSelector((state) => state.introduce);
  const introSubmit = (oldData) => {
    const { introTitle, introContents } = oldData.fieldObj;
    const data = {
      title: introTitle,
      contents: introContents,
    };
  };

  useEffect(() => {
    dispatch(introduceActions.setIntroduceDB());
    setValue("fieldObj", {
      introTitle: introduceData.introTitle,
      introContents: introduceData.introContents,
    });

    return handleSubmit(introSubmit);
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>포트폴리오 정보</FormText>
      </FormTitle>
      <form onSubmit={handleSubmit(introSubmit)}>
        <FormContents>
          <ErrorMessage>
            {errors.fieldObj?.introTitle?.type === "required" &&
              "First name is required"}
          </ErrorMessage>
          <Title>
            <Label>
              <Font>포트폴리오 제목(0/50)</Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustom
                  type="text"
                  style={{
                    border: "none",
                    background: "white",
                  }}
                  {...field}
                  size={10}
                  maxLength={50}
                />
              )}
              rules={{ required: true, maxLength: 50 }}
              name="fieldObj.introTitle"
              control={control}
            />
          </Title>
          <ErrorMessage>
            {errors.fieldObj?.introContents?.type === "required" &&
              "First name is required"}
          </ErrorMessage>
          <Content>
            <Label>
              <Font>포트폴리오 소개글(0/200)</Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustomTextarea
                  type="text"
                  size={10}
                  maxLength={200}
                  style={{ border: "none", background: "white" }}
                  {...field}
                />
              )}
              rules={{ required: true, maxLength: 200 }}
              name="fieldObj.introContents"
              control={control}
            />
          </Content>
        </FormContents>
        <input type="submit" />
      </form>
    </>
  );
}

export const ErrorMessage = styled.p`
  width: 20vw;
  margin-left: auto;
  color: #f00;
  font-size: 12px;
`;

const InputCustom = styled.textarea`
  width: 100%;
  height: 19px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  margin: auto;
`;

const InputCustomTextarea = styled(InputCustom)`
  height: 100px;
`;

const FormTitle = styled.div`
  margin: 50px 60px;
  justify-content: center;
`;

const FormText = styled.div`
  width: 125px;
  height: 24px;
  left: 0px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #000000;
`;

export const FormContents = styled.div`
  flex-direction: column;
  align-items: center;
  padding: 0px;
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin: auto 2.6vw;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin: 0px 50px;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px;
  width: 150px;
  height: 49px;
  left: 0px;
`;

export const Font = styled.div`
  width: auto;
  height: 38px;

  /* body1 */

  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* C1 */

  color: #333333;

  /* Inside auto layout */
`;

export default Introduce;
