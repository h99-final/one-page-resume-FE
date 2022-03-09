import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../../Element/ProjectCard";
import {
  AddButton,
  ButtonText,
  ContentCareer,
  FormText,
  FormTitle,
  MakeCenter,
} from "../../shared/_sharedStyle";
import styled from "styled-components";
import { apis } from "../../../../shared/axios";

function ProjectSelect() {
  const dispatch = useDispatch();
  // 사용자 프로젝트 가져오기 axios
  const project = useSelector((state) => state.project.projects);

  const [selectedProject, setSelectedProject] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    apis.projectPorf(selectedProject).then((res) => {
      console.log(res.data.data);
    });
  };

  return (
    <>
      <FormTitle>
        <FormText>프로젝트</FormText>
      </FormTitle>
      <ProjectBox>
        {project.map((e, i) => {
          return (
            <ProjectCardSelect
              setSelectedProject={setSelectedProject}
              selectedProject={selectedProject}
              key={i + "e"}
              {...e}
            />
          );
        })}
      </ProjectBox>
      <MakeCenter style={{ marginTop: "20px" }}>
        <AddButton onClick={handleClick}>
          <ContentCareer>
            <ButtonText>포트폴리오에 프로젝트 추가 하기</ButtonText>
          </ContentCareer>
        </AddButton>
      </MakeCenter>
    </>
  );
}

// 프로젝트 카드를 반응형으로 배치 하는 것 해야함
const ProjectBox = styled.div`
  display: flex;
`;

const ProjectCardSelect = styled.div`
  border: ${(props) => (props.selectedProject ? "1px #f00" : null)};
`;

export default ProjectSelect;
