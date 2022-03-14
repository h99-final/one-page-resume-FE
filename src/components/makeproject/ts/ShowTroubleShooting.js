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
  const commit = useSelector((state) => state.patchcode.commit);
  const { fileName, patchCode, content } = props;

  return (
    <>
      <Content>
        <Label>
          <Font>Commit</Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden" }}
          type="text"
          defaultValue={commit[0]?.message}
          maxLength={50}
          readOnly
        />
      </Content>
      <Content>
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
      <Content>
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
          <Highlighted text={patchCode} />
        </div>
      </Content>
      <Content>
        <Label>
          <Font>
            *추가 설명<br></br>(0/500)
          </Font>
        </Label>
        <InputCustom
          style={{ overflow: "hidden", height: "20vh" }}
          type="text"
          maxLength={50}
          defaultValue={content}
        />
      </Content>
    </>
  );
}

export default ShowTroubleShooting;
