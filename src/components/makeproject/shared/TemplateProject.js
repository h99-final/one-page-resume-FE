import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { FormText, Next } from "../../makeporf/shared/_sharedStyle";

function TemplateProject() {
  const { id, projectId } = useParams();
  const history = useHistory();

  const handlePreviousClick = () => {
    if (id === "troubleShooting") {
      history.push(`/write/project/info/${projectId}`);
      return;
    }
  };

  const handleComplete = () => {
    if (id === "info") {
      return;
    }
    history.push(`/project/${projectId}`);
  };

  return (
    <>
      <BottomNav id={id}>
        <Save id={id}>
          <h2 onClick={handlePreviousClick}>이전으로</h2>
        </Save>
        <Label htmlFor="submit" onClick={handleComplete}>
          <Save style={{ marginRight: "5px" }}>
            <input id="submit" type="submit" style={{ display: "none" }} />
            <h2>작성 완료</h2>
          </Save>
        </Label>
      </BottomNav>
    </>
  );
}

const Save = styled(Next)`
  width: 125px;
  height: 42px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #333333;
  display: flex;
  justify-content: center !important;
  align-items: center;
  display: ${(props) => (props.id === "info" ? "none" : null)};
  & > h2 {
    color: white;
  }
`;

const Label = styled.label`
  cursor: pointer;
  display: ${(props) =>
    props.id === "career" || props.id === "stack" || props.id === "project"
      ? "none"
      : "flex"};
`;

const BottomNav = styled.div`
  display: fixed;
  position: fixed;
  align-items: center;
  flex-direction: row;
  justify-content: ${(props) =>
    props.id === "info" ? "flex-end" : "space-between"};
  left: 0;
  width: 100%;
  min-width: 768px;
  height: 70px;
  margin-top: 50px;
  bottom: 0px;
  background: #999999;
  padding: 0px 5px;
`;

export default TemplateProject;
