import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function Introduce(props) {
  console.log("파라미터로 포트폴리오 id값 받으면 수정 페이지로 변함");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const introSubmit = (data) => {
    const { introTitle, introContents, githubUrl, blogUrl, bgImage } = data;
    const jsonFrm = {
      introTitle: introTitle,
      introContents: introContents,
      githubUrl: githubUrl,
      blogUrl: blogUrl,
    };
    console.log(jsonFrm);
    let frm = new FormData();
    frm.append("data", jsonFrm);
    frm.append("bgImage", bgImage);

    console.log("axios");
  };

  return (
    <>
      <div>포트폴리오 소개글 생성</div>
      <div>
        <form onSubmit={handleSubmit(introSubmit)}>
          <div>
            <input type="text" {...register("introTitle")} />
            <input type="text" {...register("introContents")} />
            <input type="text" {...register("githubUrl")} />
            <input type="text" {...register("blogUrl")} />
            <input type="file" {...register("bgImage")} />
            <input type="submit" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Introduce;
