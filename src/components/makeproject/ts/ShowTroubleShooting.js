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
  const { fileId, fileName, tsPatchCodes, tsContent } = props;

  return (
    <>
      <Content style={{ marginBottom: "30px" }}>
        <Label>
          <Font>Commit</Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden" }}
          type="text"
          //Todo
          // defaultValue={commit?.message}
          maxLength={50}
          readOnly
        />
      </Content>
      <Content style={{ marginBottom: "30px" }}>
        <Label>
          <Font>File Name</Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden" }}
          type="text"
          defaultValue={fileName}
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
          <Highlighted text={tsPatchCodes} />
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
          maxLength={50}
          defaultValue={tsContent}
        />
      </Content>
      <hr style={{ margin: "50px" }} />
    </>
  );
}

export default ShowTroubleShooting;
