import React from "react";
import styled from "styled-components";
import { FormText, Next } from "../../makeporf/shared/_sharedStyle";

function TemplateProject() {
  return (
    <>
      <BottomNav>
        <Save>
          <h2>이전으로</h2>
        </Save>
        <Label htmlFor="submit">
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
  background-color: #333333;
  display: flex;
  justify-content: center !important;
  align-items: center;
  & > h2 {
    color: white;
  }
`;

const Label = styled.label`
  display: ${(props) =>
    props.id === "career" || props.id === "stack" || props.id === "project"
      ? "none"
      : "flex"};
`;

const BottomNav = styled.div`
  display: fixed;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  left: 0;
  width: 100%;
  min-width: 768px;
  height: 70px;
  margin-top: 50px;
  bottom: 0px;
  background: #999999;
`;

export default TemplateProject;
