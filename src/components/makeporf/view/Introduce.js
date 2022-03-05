import { InputUnstyled } from "@mui/base";
import { autocompleteClasses, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

function Introduce() {
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const introSubmit = (oldData) => {
    const { introTitle, introContents } = oldData;
    const data = {
      introTitle: introTitle,
      introContents: introContents,
    };
    apis.introPorf(data);
  };

  useEffect(() => {
    console.log("axios 유저 포트폴리오 id로 포트폴리오 정보 받아오기");
    return handleSubmit(introSubmit);
  }, []);

  return (
    <>
      <FormTitle>
        <FormText>포트폴리오 정보</FormText>
      </FormTitle>

      <form onSubmit={handleSubmit(introSubmit)}>
        <FormContents>
          <Title>
            <Label>
              <Font>포트폴리오 제목(0/50)</Font>
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
          </Title>
          <Content>
            <Label>
              <Font>포트폴리오 소개글(0/200)</Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustomTextarea
                  type="text"
                  style={{ border: "none", background: "white" }}
                  {...field}
                  rows="5"
                />
              )}
              name="introContents"
              control={control}
              defaultValue="abc"
            />
          </Content>
        </FormContents>
      </form>
    </>
  );
}

const InputCustom = styled.textarea`
  width: 1120px;
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
  margin: auto 50px;
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
  top: 10px;
`;

export const Font = styled.div`
  width: 158px;
  height: 38px;
  left: 0px;
  top: 5.5px;

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

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export default Introduce;
