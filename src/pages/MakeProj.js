import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MakeProject from "../components/makeproject/MakeProject";
import MakeTroubleShooting from "../components/makeproject/MakeTroubleShooting";
import Header from "../shared/Header";

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
      {id === "info" && <MakeProject />}
      {id === "troubleshooting" && <MakeTroubleShooting />}
    </>
  );
}

export default MakeProj;
