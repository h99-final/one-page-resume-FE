import { InputUnstyled } from "@mui/base";
import { autocompleteClasses, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { apis } from "../../../shared/axios";
import { InputCustom } from "../shared/_sharedStyle";
import { actionCreators as userActions } from "../../../redux/modules/user";
function Introduce() {
  const dispatch = useDispatch();
  const defaultValues = {};
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({ defaultValues });

  const userInfo = useSelector((state) => state.user.user);

  const [data, setData] = useState({});

  const introSubmit = (data) => {
    apis.introPorf(data).then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    apis.userInfo().then((res) => {
      const { porfId } = res.data.data;
      apis.introPorfGet(porfId).then((res) => {
        const { title, contents } = res.data.data;
        setData(res.data.data);
        setValue("title", title);
        setValue("contents", contents);
      });
    });
  }, []);

  console.log(data);
  return (
    <>
      <FormTitle>
        <FormText>포트폴리오 정보</FormText>
      </FormTitle>

      <form onSubmit={handleSubmit(introSubmit)}>
        <FormContents>
          <Content>
            <Label>
              <Font>
                포트폴리오 제목<br></br>(0/50)
              </Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustom
                  type="text"
                  style={{}}
                  {...field}
                  defaultValue={data?.title}
                />
              )}
              name="title"
              control={control}
            />
          </Content>
          <MultiContent>
            <Label>
              <Font>
                포트폴리오 소개글 <br></br>(0/2000)
              </Font>
            </Label>
            <Controller
              render={({ field }) => (
                <InputCustom
                  type="text"
                  style={{ height: "200px" }}
                  {...field}
                  defaultValue={data?.contents}
                />
              )}
              name="contents"
              control={control}
            />
          </MultiContent>
        </FormContents>
      </form>

    </>
  );
}

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
  padding-bottom: 50px;
  height: 100%;
`;

export const MultiContent = styled.div`

  display: flex;
  flex-direction: row;
  margin: 0px 50px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 50px 20px 50px;
  vertical-align: middle;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 200px;
  min-width: 150px;
  height: 49px;
  left: 0px;
`;

export const Font = styled.div`
  /* body1 */
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* C1 */

  color: #333333;

  margin: 10px;

  /* Inside auto layout */


`;

export default Introduce;
