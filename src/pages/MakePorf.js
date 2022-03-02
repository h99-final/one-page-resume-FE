import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import Introduce from "../components/makeporf/Introduce";
import SetProject from "../components/makeporf/SetProject";
import SideBar from "../components/makeporf/SideBar";
import Stack from "../components/makeporf/Stack";
import Template from "../components/makeporf/Template";
import Header from "../shared/Header";

function MakePorf() {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <Header />
      {id === "introduce" ? <Introduce /> : null}
      {id === "template" ? <Template /> : null}
      {id === "stack" ? <Stack /> : null}
      {id === "project" ? <SetProject /> : null}
      <div>
        <SideBar />
      </div>
    </>
  );
}

export default MakePorf;
