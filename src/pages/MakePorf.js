import React from "react";
import { useParams } from "react-router-dom";
import Introduce from "../components/makeporf/Introduce";

function MakePorf() {
  const params = useParams();
  console.log(params);

  return <>{params.id === "introduce" ? <Introduce /> : null}</>;
}

export default MakePorf;