import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

function MakeProject() {
  //포트폴리오 프로젝트 생성
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [stacks, setStacks] = useState([]);
  const stackSubmit = ({ stack }) => {
    setStacks((oldStacks) => [...oldStacks, stack]);
  };

  const projectSubmit = (data) => {
    const { projectTitle, projectContent, images, gitRepoUrl } = data;

    const _gitRepoName = gitRepoUrl.split("/");
    const gitRepoName = _gitRepoName[_gitRepoName.length - 1];

    const jsonFrm = {
      projectTitle: projectTitle,
      projectContent: projectContent,
      projectStack: stacks,
      gitRepoUrl: gitRepoUrl,
      gitRepoName: gitRepoName,
    };
    let frm = new FormData();
    frm.append("data", jsonFrm);
    frm.append("images", images);

    console.log("axios 로 프로젝트 생성하기");
  };

  const handleClick = () => {
    history.push("/write/project/troubleshooting/id");
  };

  useEffect(() => {
    console.log("유저가 프로젝트를 수정하고 싶을 수도 있으니까");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(projectSubmit)}>
        <input value={"asdf"} type="text" {...register("projectTitle")}></input>
        <input type="text" {...register("projectContent")}></input>
        <input type="text" />
        {/* // 파일 여러개 받는 법 */}
        <input type="file" {...register("images")} />
        <input type="text" {...register("githubUrl")} />

        <input type="submit" />
      </form>
      <form onSubmit={handleSubmit(stackSubmit)}>
        <input
          {...register("stack", {
            required: "your stack",
          })}
          placeholder="Stack 작성"
        />
        <input type="submit" />
      </form>
      <ul>
        {stacks.map((stack, index) => (
          <li key={index}>{stack}</li>
        ))}
      </ul>
      <button onClick={handleClick}>다음페이지로</button>
    </>
  );
}

export default MakeProject;
