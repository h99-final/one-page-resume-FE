import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProjectCard from "../../Element/ProjectCard";
import { FormText, FormTitle } from "../shared/_sharedStyle";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

function ProjectSelect() {
  // 사용자 프로젝트 가져오기 axios
  const project = useSelector((state) => state.project.projects);

  const [selectedProject, setSelectedProject] = useState([]);
  console.log(selectedProject);

  // useEffect(() => {
  //   apis.
  // },[])

  return (
    <>
      <FormTitle>
        <FormText>프로젝트</FormText>
      </FormTitle>
      <ProjectBox>
        {project.map((e, i) => {
          return (
            <ProjectCard
              setSelectedProject={setSelectedProject}
              key={i}
              {...e}
            />
          );
        })}
      </ProjectBox>
    </>
  );
}

// 프로젝트 카드를 반응형으로 배치 하는 것 해야함
const ProjectBox = styled.div`
  display: flex;
`;

export default ProjectSelect;
