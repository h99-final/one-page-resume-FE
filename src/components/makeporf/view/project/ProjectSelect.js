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
  const project = useSelector((state) => state.project.projects);

  // props로 건네줘서 핸들링
  const [selectedProjects, setSelectedProjects] = useState([]);

  const submit = () => {
    // 프로젝트 데이터 보내기
    const data = {
      projectId: selectedProjects,
    };
    apis.projectPorf(data).then((res) => {
      // 포트폴리오 화면으로 이동시켜주기
      console.log(res);
    });
  };
  // 사용자 프로젝트 가져오기 axios
  // 프로젝트 작성 페이지 기능 마치고

  return (
    <>
      <FormTitle>
        <FormText>프로젝트</FormText>
      </FormTitle>
      <ProjectBox>
        {project.map((e, i) => {
          return (
            <ProjectCard
              selectedProjects={selectedProjects}
              setSelectedProjects={setSelectedProjects}
              key={i + "e"}
              {...e}
            />
          );
        })}
      </ProjectBox>
      <button onClick={submit}>ToDo</button>
      <MakeCenter style={{ marginTop: "20px" }}>
        <AddButton>
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

// const ProjectCardSelect = styled(ProjectCard)`
//   border: ${(props) =>
//     props.selected ? "1px solid blue;" : "1px solid #999999;"};
// `;

export default ProjectSelect;
