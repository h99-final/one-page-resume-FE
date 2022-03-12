import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MakeProject from "../components/makeproject/MakeProject";
import MakeTroubleShooting from "../components/makeproject/ts/MakeTroubleShooting";
import PorjWriteHeader from "../components/makeproject/ProjWriteHeader";
import Header from "../shared/Header";
import { WriteableForm, WriteForm, WriteTemplate } from "./MakePorf";

function MakeProj() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  console.log(id);

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
