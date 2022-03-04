import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import Introduce from "../components/makeporf/Introduce";
import PorfWriteHeader from "../components/makeporf/PorfWriteHeader";
import SetProject from "../components/makeporf/SetProject";
import SideBar from "../components/makeporf/SideBar";
import Stack from "../components/makeporf/Stack";
import Template from "../components/makeporf/Template";
import Header from "../shared/Header";

import styled from "styled-components";
import UserInfo from "../components/makeporf/UserInfo";

function MakePorf() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Header />
      <PorfWriteHeader />
      <div>
        <WriteTemplate>
          <SideBar />
          {id === "introduce" ? <Introduce /> : null}
          {id === "info" ? <UserInfo /> : null}
          {id === "stack" ? <Stack /> : null}
          {id === "project" ? <SetProject /> : null}
        </WriteTemplate>
        <Template />
      </div>
    </>
  );
}

const WriteTemplate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 1380px;
  height: 654px;
  left: 30px;
  top: 252px;
`;

export default MakePorf;
