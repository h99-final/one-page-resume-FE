import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actionCreators } from "../../../redux/modules/patchcode";
import {
  Content,
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
import { Font, FormContents } from "../../makeporf/view/Introduce";
import { FormMainText, FormSubText } from "../MakeProject";
import TemplateProject from "../shared/TemplateProject";
import Highlighted from "./Highlight";
import { IconBox } from "./ShowTroubleShooting";

function ModifyTroubleShooting(props) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { id, projectId } = useParams();

  const {
    fileId,
    commit,
    fileName,
    tsPatchCodes,
    tsContent,
    tsFiles,
    tsName,
    commitMsg,
    commitId,
    setModify,
    handleModify,
  } = props;

  const tsFile = useSelector((state) => state.patchcode.tsFile);

  const handleDelete = () => {
    dispatch(actionCreators.deleteTsDB(projectId, commitId));
  };

  const onValid = (data) => {
    let _tsFile = tsFile.filter((e) => e.commitId === commitId);
    // commitId state 에 추가
    let _data = {
      commitMessage: commitMsg,
      sha: tsFile[0].sha,
      tsName: data.tsName,
      tsFiles: [tsFile[0].tsFiles],
    };
    for (let i = 0; i < tsFiles.length; i++) {
      console.log(data);
      tsFiles[i].tsContent = data;
      console.log(tsFiles[i]);
    }
    handleModify();
  };

  useEffect(() => {
    setValue("tsName", tsName);
    for (let i = 0; i < tsFiles.length; i++) {
      setValue(`tsContent${i}`, tsFiles[i].tsContent);
    }
  }, []);

  return (
    <>
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: "auto",
            marginRight: "50px",
            width: "100px",
          }}
        >
          <IconBox id={commitId} onClick={handleSubmit(onValid)}>
            <img alt="" src={process.env.PUBLIC_URL + "/img/pencil.svg"} />
          </IconBox>
          <IconBox onClick={handleDelete}>
            <img alt="" src={process.env.PUBLIC_URL + "/img/Trash.svg"} />
          </IconBox>
        </div>
        <form>
          <Content style={{ marginBottom: "30px" }}>
            <Label>
              <Font>트러블 슈팅 제목</Font>
            </Label>
            <InputCustom
              style={{ overflow: "hidden" }}
              type="text"
              defaultValue={tsName}
              {...register("tsName", { required: true })}
              maxLength={50}
            />
          </Content>
          <Content style={{ marginBottom: "30px" }}>
            <Label>
              <Font>Commit</Font>
            </Label>
            <InputCustom
              style={{ overflow: "hidden" }}
              type="text"
              //Todo
              defaultValue={commitMsg}
              maxLength={50}
              readOnly
            />
          </Content>
          {tsFiles?.map((ts, i) => {
            return (
              <div>
                {/* <IconBox id={ts.fileId} onClick={handleFileDelete}>
    <img alt="" src={process.env.PUBLIC_URL + "/img/Trash.svg"} />
  </IconBox> */}
                <Content style={{ marginBottom: "30px" }}>
                  <Label>
                    <Font>File Name</Font>
                  </Label>
                  <InputCustom
                    style={{ overflow: "hidden" }}
                    type="text"
                    defaultValue={ts.fileName}
                    maxLength={50}
                  />
                </Content>
                <Content style={{ marginBottom: "30px" }}>
                  <Label>
                    <Font>Patch Code</Font>
                  </Label>
                  <div
                    style={{
                      display: "inline-block",
                      width: "100%",
                      flexDirection: "column",
                    }}
                  >
                    <Highlighted text={ts.tsPatchCodes} />
                  </div>
                </Content>
                <Content style={{ marginBottom: "30px" }}>
                  <Label>
                    <Font>
                      *추가 설명<br></br>(0/500)
                    </Font>
                  </Label>
                  <InputCustom
                    style={{ overflow: "hidden", height: "20vh" }}
                    type="text"
                    maxLength={500}
                    {...register(`tsContent${i}`)}
                    defaultValue={ts.tsContent}
                  />
                </Content>
              </div>
            );
          })}
        </form>
      </>
      <hr style={{ margin: "50px" }} />
    </>
  );
}

export default ModifyTroubleShooting;
