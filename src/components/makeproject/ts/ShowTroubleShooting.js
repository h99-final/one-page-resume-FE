import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators } from "../../../redux/modules/patchcode";
import { apis } from "../../../shared/axios";
import {
  Content,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
import { Font } from "../../makeporf/view/Introduce";
import Highlighted from "./Highlight";
import ModifyTroubleShooting from "./ModifyTroubleShooting";

function ShowTroubleShooting(props) {
  const { handleSubmit } = useForm();
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
  } = props;

  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [modify, setModify] = useState(false);

  const handleDelete = () => {
    dispatch(actionCreators.deleteTsDB(projectId, commitId));
  };

  const handleFileDelete = (e) => {
    dispatch(
      actionCreators.deleteTsFileDB(projectId, commitId, e.currentTarget.id)
    );
  };

  const handleModify = (e) => {
    if (modify === false) {
      setModify(true);
    } else {
      setModify(false);
    }
  };

  console.log(modify);

  return (
    <>
      {modify ? (
        <ModifyTroubleShooting
          {...props}
          setModify={setModify}
          handleModify={handleModify}
        />
      ) : (
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
            <IconBox id={commitId} onClick={handleModify}>
              <img alt="" src={process.env.PUBLIC_URL + "/img/pencil.svg"} />
            </IconBox>
            <IconBox onClick={handleDelete}>
              <img alt="" src={process.env.PUBLIC_URL + "/img/Trash.svg"} />
            </IconBox>
          </div>
          <Content style={{ marginBottom: "30px" }}>
            <Label>
              <Font>트러블 슈팅 제목</Font>
            </Label>
            <InputCustom
              style={{ overflow: "hidden" }}
              type="text"
              defaultValue={tsName}
              maxLength={50}
              readOnly
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
          {tsFiles?.map((ts) => {
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
                    readOnly
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
                    value={ts.tsContent}
                    readOnly
                  />
                </Content>
              </div>
            );
          })}
        </>
      )}

      <hr style={{ margin: "50px" }} />
    </>
  );
}

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #393a47;
  border-radius: 5px;
  /* margin-left: auto; */
  /* margin-right: 50px; */
  margin-bottom: 10px;
  width: 40px;
  height: 40px;
`;

export default ShowTroubleShooting;
