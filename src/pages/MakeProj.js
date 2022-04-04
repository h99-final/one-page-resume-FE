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
