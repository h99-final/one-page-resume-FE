import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AsyncPaginate } from "react-select-async-paginate";
import { renameKeys } from "../../shared/common";
import loadOptions from "./loadOptions";

const initialCommit = {
  is_loading: true,
  commits: [
    {
      sha: "0",
      message: "첫번째 커밋",
    },
    {
      sha: "1",
      message: "두번째 커밋",
    },
  ],
};

const initialFile = {
  commitId: "id",
  files: [
    {
      patchCode: "patchCode",
      fileName: "name",
    },
    {
      patchCode: "patchCode",
      fileName: "name",
    },
  ],
};

const mapping = {
  sha: "value",
  message: "label",
};

function MakeTroubleShooting() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [page, setPage] = useState(0);
  const [commit, setCommit] = useState("");
  const [file, setFile] = useState("");
  const [value, onChange] = useState(null);

  const repoSubmit = async (data) => {
    await console.log("axios 레포지토리 입력하면 커밋 메세지 주게");

    //완료하면 page 1로 처리
    setPage(1);
    setCommit();
    return {
      options: renameKeys(mapping, initialCommit.commits),
      is_loading: false,
    };
  };

  const handleCommitChange = (data) => {
    console.log("axios 커밋 입력하면 파일 리스트 주기");

    setPage(2);
    setCommit("abc");
  };

  return (
    <>
      <h2>트러블 슈팅 작성 페이지</h2>
      {page >= 0 ? (
        <form onSubmit={handleSubmit(repoSubmit)}>
          <label htmlFor="githubRepo">
            깃허브 레포지토리
            <input type="text" {...register("githubRepo")} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      ) : null}
      {page >= 1 ? (
        <>
          <AsyncPaginate
            value={value}
            loadOptions={loadOptions}
            onChange={onChange}
          />
        </>
      ) : null}
      {page >= 2 ? (
        <>
          <AsyncPaginate
            closeMenuOnSelect
            value={file}
            loadOptions={handleCommitChange}
            // onChange={handlefileChange}
          />
        </>
      ) : null}
    </>
  );
}

export default MakeTroubleShooting;
