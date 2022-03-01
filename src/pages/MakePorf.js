import React from "react";
import { useParams } from "react-router-dom";
import Introduce from "../components/makeporf/Introduce";
import SetProject from "../components/makeporf/SetProject";
import SideBar from "../components/makeporf/SideBar";
import Stack from "../components/makeporf/Stack";
import Template from "../components/makeporf/Template";

function MakePorf() {
  const params = useParams();
  console.log(params);

  return (
    <>
      {params.id === "introduce" ? <Introduce /> : null}
      {params.id === "template" ? <Template /> : null}
      {params.id === "stack" ? <Stack /> : null}
      {params.id === "project" ? <SetProject /> : null}
      <div>
        <SideBar />
      </div>
    </>
  );
}

export default MakePorf;
