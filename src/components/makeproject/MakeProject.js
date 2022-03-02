import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import options from "../makeporf/Stack";
import makeAnimated from "react-select/animated";

function MakeProject() {
  //포트폴리오 프로젝트 생성
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const animatedComponents = makeAnimated();

  const [stack, setStack] = useState();

  const handleChange = (e) => {
    let projStackArray = [];
    e.map((stack) => {
      return projStackArray.push(stack.value);
    });
    setStack(projStackArray);
  };

  const projectSubmit = (data) => {
    console.log(data);
    const { projectTitle, projectContent, images } = data;

    const jsonFrm = {
      projectTitle: projectTitle,
      projectContent: projectContent,
      projectStack: stack,
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
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          {...register("projectStack")}
          options={options}
          onChange={handleChange}
        />
        {/* // 파일 여러개 받는 법 */}
        <input type="file" {...register("images")} />
      </form>
    </>
  );
}

export default MakeProject;
