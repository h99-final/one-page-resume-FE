import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function MakeProject() {
  //포트폴리오 프로젝트 생성
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [stacks, setStacks] = useState([]);
  console.log(stacks);
  const stackSubmit = ({ stack }) => {
    setStacks((oldStacks) => [...oldStacks, stack]);
  };

  const projectSubmit = (data) => {
    const { projectTitle, projectContent, images } = data;

    const jsonFrm = {
      projectTitle: projectTitle,
      projectContent: projectContent,
      projectStack: stacks,
    };
    let frm = new FormData();
    frm.append("data", jsonFrm);
    frm.append("images", images);

    console.log("axios 로 프로젝트 생성하기");
  };

  useEffect(() => {
    console.log("유저가 프로젝트를 수정하고 싶을 수도 있으니까");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(projectSubmit)}>
        <input type="text" {...register("projectTitle")}></input>
        <input type="text" {...register("projectContent")}></input>
        <input type="text" />
        {/* // 파일 여러개 받는 법 */}
        <input type="file" {...register("images")} />

        <input type="submit" />
      </form>
      <form onSubmit={handleSubmit(stackSubmit)}>
        {" "}
        <input
          {...register("stack", {
            required: "your stack",
          })}
          placeholder="Stack 작성"
        />
        <input type="submit" />
      </form>
      <ul>
        {stacks.map((stack, index) => (
          <li key={index}>{stack}</li>
        ))}
      </ul>
    </>
  );
}

export default MakeProject;
