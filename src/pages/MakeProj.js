import React from "react";
import { useRouteMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../shared/Header";

function MakeProj(props) {
  const { id } = useParams();
  console.log(id);

  return (
    <>
      <Header />
      <h2>프로젝트만 보여주는 페이지입니다</h2>
      <Link to={`/write`}>프로젝트 작성하기</Link>
    </>
  );
}

export default MakeProj;
