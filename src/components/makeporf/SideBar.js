import React from "react";
import { Link } from "react-router-dom";

function SideBar() {
  return (
    <>
      <div>
        <Link to="/write/introduce">소개글</Link>
        <Link to="/write/template">템플릿</Link>
        <Link to="/write/stack">스택</Link>
        <Link to="/write/project">프로젝트 넣기</Link>
      </div>
    </>
  );
}

export default SideBar;
