import { style } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Inner } from "../makeporf/shared/_sharedStyle";
import { Font } from "../makeporf/view/Introduce";

function ProjectCard(props) {
  const userInfo = useSelector((state) => state.user.user);
  const { id, title, stack, imageUrl } = props;
  const { selectedProjects, setSelectedProjects } = props;

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  useEffect(() => {
    if (selected) {
      setSelectedProjects((selectedProject) => [...selectedProject, id]);
    } else {
      setSelectedProjects((selectedProject) =>
        selectedProject.filter((e) => e !== id)
      );
    }
  }, [selected]);

  return (
    <>
      <ProjectForm selected={selected} onClick={handleClick}>
        <InnerCard src={imageUrl} />

        <ProjectDetail>
          <ProjectStacks>
            {/* 스택의 길이가 3보다 길때 잘라서 보여줌 */}
            {stack.length > 3
              ? stack.slice(0, 3).map((e, i) => {
                  return (
                    <>
                      <ProjectStack key={i + "e"}>{e}</ProjectStack>
                    </>
                  );
                })
              : stack.map((e, i) => {
                  return (
                    <>
                      <ProjectStack key={i + "e"}>{e}</ProjectStack>
                    </>
                  );
                })}
            {stack.length > 3 && (
              <ProjectStack style={{ background: "none", color: "#696B7B" }}>
                +{stack.length - 3}
              </ProjectStack>
            )}
          </ProjectStacks>
          <ProjectTitle>
            <FontProject>{title}</FontProject>
          </ProjectTitle>
          {selected && (
            <Icon>
              <img alt="" src={process.env.PUBLIC_URL + "/img/check.svg"} />
            </Icon>
          )}
        </ProjectDetail>
      </ProjectForm>
    </>
  );
}

// 프로젝트 보여주는 페이지 추가

const FontProject = styled(Font)`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const InnerCard = styled.img`
  width: 100%;
  height: 180px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  position: relative;
  overflow: hidden;
  object-fit: cover;
  z-index: 1;
`;

export const ProjectForm = styled.div`
  width: 400px;
  height: 313px;
  border-radius: 10px;
  margin-bottom: 30px;
  background-color: #393a47;
  border: ${(props) =>
    props.selected ? "2px solid #00C4B4;" : "1px solid none;"};
  box-sizing: border-box;
  position: relative;
  z-index: 0;
`;

const ProjectDetail = styled.div``;

const ProjectStacks = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProjectStack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto 3px;
  padding: 10px 20px;
  width: fit-content;
  border-radius: 5px;
  color: white;
  border: 1px solid #696b7b;
  background-color: #696b7b;
`;

const ProjectTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 350px;
  height: 48px;
  margin: 10px 25px;
`;

const Icon = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  left: 350px;
  top: -280px;
  z-index: 2;
`;

export default ProjectCard;
