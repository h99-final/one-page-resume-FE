import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div>
        <Link to="/write/portfolio/introduce">소개글</Link>
        <Link to="/write/portfolio/template">템플릿</Link>
        <Link to="/write/portfolio/stack">스택</Link>
        <Link to="/write/portfolio/project">프로젝트 넣기</Link>
      </div>
    </>
  );
}

export default SideBar;
