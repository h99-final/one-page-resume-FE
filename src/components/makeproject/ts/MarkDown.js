import React from "react";
import MDEditor, {
  commands,
  ICommand,
  TextState,
  TextAreaTextApi,
} from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { InputCustom } from "../../makeporf/shared/_sharedStyle";
import styled from "styled-components";

function MarkDown({ value, setValue }) {
  return (
    <Container>
      <MDEditor
        style={{
          backgroundColor: "#393a47",
          width: "100%",
          minWidth: "55%",
          height: "600px",
          borderRadius: "10px",
          padding: "14px 0px",
          border: "1px solid #393a47",
          color: "#fff",
          boxSizing: "border-box",
          fontSize: "24px",
        }}
        textareaProps={{
          placeholder: "마크다운으로 작성이 가능합니다. Readme를 관리해보세요.",
        }}
        hideToolbar={true}
        defaultTabEnable={true}
        height={600}
        preview="edit"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        enableScroll={true}
        visiableDragbar={false}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 573px;
  display: flex;
`;

export default MarkDown;
