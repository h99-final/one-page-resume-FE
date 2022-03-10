import React from "react";
import { useParams } from "react-router-dom";
import Introduce from "../components/makeporf/view/Introduce";
import PorfWriteHeader from "../components/makeporf/shared/PorfWriteHeader";
import SideBar from "../components/makeporf/shared/SideBar";
import Stack from "../components/makeporf/view/Stack";
import Template from "../components/makeporf/shared/Template";
import Header from "../shared/Header";

import styled from "styled-components";
import UserInfo from "../components/makeporf/view/UserInfo";
import PreviousNext from "../components/makeporf/shared/PreviousNext";
import Career from "../components/makeporf/view/Career/Career";
import ProjectSelect from "../components/makeporf/view/project/ProjectSelect";

function MakePorf() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Header />
      <WriteForm>
        <PorfWriteHeader />
        <WriteTemplate>
          <SideBar />
          <WriteableForm>
            {id === "introduce" ? <Introduce /> : null}
            {id === "info" ? <UserInfo /> : null}
            {id === "stack" ? <Stack /> : null}
            {id === "career" ? <Career /> : null}
            {id === "project" ? <ProjectSelect /> : null}
          </WriteableForm>
        </WriteTemplate>
        <PreviousNext />
      </WriteForm>
      <Template />
    </>
  );
}
export const WriteForm = styled.div`
  width: 95%;
  height: auto;
  min-width: 834px;
  min-height: 80vh;

  display: block;
  justify-content: center;
  margin: 0px auto;

  background: #ffffff;
  @media screen and (min-width: 1194px) {
    & {
      width: 95%;
      justify-content: center;
      margin: 0px auto;
    }
  }
  @media screen and (min-width: 834px) {
    & {
      margin: 0px auto;
    }
  }
`;

export const WriteTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 252px;
  border-radius: 10px;
  margin-bottom: 30px;
`;

export const WriteableForm = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0px;

  width: 100%;
  height: 100%;
  background-color: #ededed;
  border-radius: 10px;
  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px;
  padding-bottom: 10px;
`;
export default MakePorf;
