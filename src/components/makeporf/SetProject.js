import React, { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const projectList = [
  {
    projectId: "id",
    projectTitle: "title",
    value: "project1",
    label: "c",
  },
  {
    projectId: "id",
    projectTitle: "title",
    value: "project2",
    label: "b",
  },
  {
    projectId: "id",
    projectTitle: "title",
    value: "나다",
    label: "a",
  },
];
//포트폴리오 프로젝트 조회 API
//포트폴리오 프로젝트 등록 API
function SetProject() {
  const animatedComponents = makeAnimated();
  const [options, setOptions] = useState([]);
  const [projects, setProjects] = useState([]);

  const handleChange = (e) => {
    let projectArray = [];
    e.map(({ projectId }) => {
      return projectArray.push(projectId);
    });
    console.log(e);
    setProjects(projectArray);
  };

  const onSubmit = (e) => {
    console.log("axios 저장 보내기");
  };

  useEffect(() => {
    console.log("axios 프로젝트 조회 후 옵션에 등록");
    console.log(projects);
  }, [projects]);
  return (
    <>
      <div>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={projectList}
          isMulti
          onChange={handleChange}
        />
        <button onSubmit={onSubmit}>등록하기</button>
      </div>
    </>
  );
}

export default SetProject;
