import React from "react";
import { useForm } from "react-hook-form";
import MakeProject from "../components/makeproject/MakeProject";
import MakeTroubleShooting from "../components/makeproject/ts/MakeTroubleShooting";
import PorjWriteHeader from "../components/makeproject/ProjWriteHeader";
import Header from "../shared/Header";
import { WriteableForm, WriteForm, WriteTemplate } from "./MakePorf";
// router
// private 접근권한막기
import { Redirect, Route, useParams } from "react-router-dom";

function MakeProj() {
  const { id, projectId } = useParams();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  if (projectId) {
    if (!userInfo.projectId.includes(projectId)) {
      alert("접근 권한이 없습니다.");
      return (
        // 유저 정보에 프로젝트가 있는지 여부에 따라서 보여줌
        // 아니면 홈 화면으로
        <Route render={(props) => <Redirect to="/" />} />
      );
    }
  }

  return (
    <>
      <Header />
      <WriteForm>
        <PorjWriteHeader />
        <WriteTemplate>
          <WriteableForm>
            {id === "info" && <MakeProject />}
            {id === "troubleShooting" && <MakeTroubleShooting />}
          </WriteableForm>
        </WriteTemplate>
      </WriteForm>
    </>
  );
}

export default MakeProj;
