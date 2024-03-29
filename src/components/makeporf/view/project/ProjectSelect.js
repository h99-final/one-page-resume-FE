import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProjectCard from "../../../Element/ProjectCard";
import {
  AddButton,
  ButtonText,
  ContentCareer,
  ErrorMessage,
  FormText,
  FormTitle,
  MakeCenter,
  SuccessMessage,
} from "../../shared/_sharedStyle";
import styled from "styled-components";
import { apis } from "../../../../shared/axios";
import Template from "../../shared/Template";
import { actionCreators as projectActions } from "../../../../redux/modules/myproject";
import PreviousNext from "../../shared/PreviousNext";
import { useHistory } from "react-router-dom";
import Spinner from "../../../../shared/Spinner";

function ProjectSelect() {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const project = useSelector((state) => state.myproject.projects);
  const is_loading = useSelector((state) => state.myproject.is_loading);
  // props로 건네줘서 핸들링
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [error, setError] = useState("");
  const [success, setSucess] = useState("");

  const projectSubmit = () => {
    if (selectedProjects.length === 0) {
      setError("프로젝트는 한 개 이상 이어야 합니다.");
      // history.push("/write/project/info");
      return;
    }
    // 프로젝트 데이터 보내기
    const data = { projectId: selectedProjects };

    apis.projectPorf(data).then((res) => {
      // 포트폴리오 화면으로 이동시켜주기
      setError("");
      setSucess("프로젝트 선택 완료");
      setModalOpen(true)
    });
  };
  // 사용자 프로젝트 가져오기 axios
  // 프로젝트 작성 페이지 기능 마치고
  useEffect(() => {
    dispatch(projectActions.setProjectDB());
  }, []);

  return (
    <>
      {!is_loading ? (
        <form>
          <FormTitle>
            <FormText>프로젝트</FormText>
          </FormTitle>
          <ProjectBox>
            {project?.map((e, i) => {
              return (
                <ProjectCard
                  selectedProjects={selectedProjects}
                  setSelectedProjects={setSelectedProjects}
                  key={`project-${i}-${e.id}`}
                  {...e}
                />
              );
            })}
          </ProjectBox>

          <MakeCenter
            style={{ marginBottom: "10px" }}
            // onClick={() => history.push(`/write/project/info`)}
            onClick={projectSubmit}
          >
            <AddButton>
              <ContentCareer>
                <ButtonText>적용하기</ButtonText>
              </ContentCareer>
            </AddButton>
          </MakeCenter>
          <div style={{ marginBottom: "60px" }}>
            {project?.length === 0 && (
              <ErrorMessageSpan
                style={{
                  fontSize: "16px",
                  color: "#CFD3E2",
                  textAlign: "center",
                  lineHeight: "24px",
                }}
              >
                포트폴리오에 추가할 프로젝트가 없어요. <br />새 프로젝트 작성
                버튼을 눌러 포트폴리오를 완성해보세요.
              </ErrorMessageSpan>
            )}
            {error && <ErrorMessageSpan>{error}</ErrorMessageSpan>}
          </div>
          <SuccessMessage>{success}</SuccessMessage>
          <PreviousNext />
          <Template projectSubmit={projectSubmit} modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </form>
      ) : (
        <Spinner />
      )}
    </>
  );
}

const ErrorMessageSpan = styled(ErrorMessage)`
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

// 프로젝트 카드를 반응형으로 배치 하는 것 해야함
const ProjectBox = styled.div`
  justify-content: space-around;
  margin: 60px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  width: 93%;
  /* min-width: 1300px; */
  /* max-width: 1900px; */
  height: 100%;
  border-radius: 10px;
  @media only screen and (max-width: 1300px) {
  }
`;

// const ProjectCardSelect = styled(ProjectCard)`
//   border: ${(props) =>
//     props.selected ? "1px solid blue;" : "1px solid #999999;"};
// `;

export default ProjectSelect;
