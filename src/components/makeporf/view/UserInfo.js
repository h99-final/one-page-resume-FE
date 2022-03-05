import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function UserInfo() {
  const defaultValues = {};
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  useEffect(() => {
    console.log("axios 개인 정보 가져오기");
  }, []);

  return (
    <>
      <div>내 정보</div>
      <UserInfoForm>
        <Controller
          render={({ field }) => <TextField {...field} />}
          name="name"
          control={control}
          defaultValue="abc"
        />
        <Controller
          render={({ field }) => <TextField {...field} />}
          name="job"
          control={control}
          defaultValue="abc"
        />
      </UserInfoForm>
    </>
  );
}

const UserInfoForm = styled.div`
  position: static;
  width: 1380px;
  height: 891px;
  left: 0px;
  top: 85px;

  /* C5 */

  background: #ededed;
  border-radius: 10px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 15px 0px;
`;

export default UserInfo;
