import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Inner } from "../makeporf/shared/_sharedStyle";
import { Font } from "../makeporf/view/Introduce";

function ProjectCard(props) {
  const userInfo = useSelector((state) => state.user.user);
  const { id, title, stack, img } = props;

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <>
      <ProjectForm onClick={handleClick} selected={selected}>
        <InnerCard src="http://www.imgcomfort.com/no/-/media/corporatesite/socialshareimages/img-logo1200x600.jpg" />
        <ProjectDetail>
          <ProjectStacks>
            {/* 스택의 길이가 3보다 길때 잘라서 보여줌 */}
            {stack.length > 3
              ? stack.slice(0, 3).map((e, i) => {
                  return (
                    <>
                      <ProjectStack key={i}>{e}</ProjectStack>{" "}
                    </>
                  );
                })
              : stack.map((e, i) => {
                  return (
                    <>
                      <ProjectStack key={i}>{e}</ProjectStack>
                    </>
                  );
                })}
            {stack.length > 3 && (
              <ProjectStack>+ {stack.length - 3}</ProjectStack>
            )}
          </ProjectStacks>
          <ProjectTitle>
            <FontProject>{title}</FontProject>
          </ProjectTitle>
        </ProjectDetail>
        {id !== "project" && (
          <ProjectOwner>
            <FontOwner>{userInfo.name}</FontOwner>
            <FontJob>{userInfo.job}</FontJob>
          </ProjectOwner>
        )}
      </ProjectForm>
    </>
  );
}

// 프로젝트 보여주는 페이지 추가
const FontOwner = styled(Font)``;
const FontJob = styled(Font)``;

const ProjectOwner = styled.div``;

const FontProject = styled(Font)`
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

const InnerCard = styled(Inner)`
  width: 398px;
  height: 180px;
  border-top-left-radius: 10px;
`;

const ProjectForm = styled.div`
  width: 400px;
  height: 313px;
  border-radius: 10px;
  border: ${(props) =>
    props.selected ? "1px solid blue;" : "1px solid #999999;"};
  box-sizing: border-box;
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
  padding: 5px 15px;
  width: 61px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid;
`;

const ProjectTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 350px;
  height: 48px;
  margin: 10px 25px;
`;

export default ProjectCard;
