import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";

function Introduce() {
  const defaultValues = {};
  const [title, setTitle] = useState("sasd");
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues });

  const introSubmit = (oldData) => {
    console.log(oldData);
    const { introTitle, introContents } = oldData;
    const data = {
      introTitle: introTitle,
      introContents: introContents,
    };
    console.log("axios");
  };

  const onTitle = (e) => {
    setTitle(e.target.value);
  };

  useEffect(() => {
    console.log("axios 유저 포트폴리오 id로 포트폴리오 정보 받아오기");
  }, []);

  return (
    <>
      <div>
        <div>포트폴리오 정보</div>
        <div>
          <form onSubmit={handleSubmit(introSubmit)}>
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="introTitle"
              control={control}
              defaultValue="abc"
            />
            <Controller
              render={({ field }) => <TextField {...field} />}
              name="introContents"
              control={control}
              defaultValue="abc"
            />
            <input type="submit" />
          </form>
        </div>
      </div>
    </>
  );
}

export default Introduce;
