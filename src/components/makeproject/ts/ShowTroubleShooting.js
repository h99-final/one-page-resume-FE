import React from "react";
import { useSelector } from "react-redux";
import {
  Content,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
import { Font } from "../../makeporf/view/Introduce";
import Highlighted from "./Highlight";

function ShowTroubleShooting(props) {
  const {
    fileId,
    commit,
    fileName,
    tsPatchCodes,
    tsContent,
    tsFiles,
    tsName,
    commitMsg,
  } = props;
  return (
    <>
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
                defaultValue={ts.tsContent}
              />
            </Content>
          </div>
        );
      })}

      <hr style={{ margin: "50px" }} />
    </>
  );
}

export default ShowTroubleShooting;
