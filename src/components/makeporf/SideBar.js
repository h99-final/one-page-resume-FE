import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div>
        <Link to="/portfolio/write/introduce">소개글</Link>
        <Link to="/portfolio/write/template">템플릿</Link>
        <Link to="/portfolio/write/stack">스택</Link>
        <Link to="/portfolio/write/project">프로젝트 넣기</Link>
      </div>
    </>
  );
}

export default SideBar;
