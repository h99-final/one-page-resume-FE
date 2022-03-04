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

const UserInfoForm = styled.div``;

export default UserInfo;
