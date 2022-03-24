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

const title3 = {
  name: "title3",
  keyCommand: "title3",
  buttonProps: { "aria-label": "Insert title3" },
  icon: (
    <svg width="12" height="12" viewBox="0 0 520 520">
      <path
        fill="currentColor"
        d="M15.7083333,468 C7.03242448,468 0,462.030833 0,454.666667 L0,421.333333 C0,413.969167 7.03242448,408 15.7083333,408 L361.291667,408 C369.967576,408 377,413.969167 377,421.333333 L377,454.666667 C377,462.030833 369.967576,468 361.291667,468 L15.7083333,468 Z M21.6666667,366 C9.69989583,366 0,359.831861 0,352.222222 L0,317.777778 C0,310.168139 9.69989583,304 21.6666667,304 L498.333333,304 C510.300104,304 520,310.168139 520,317.777778 L520,352.222222 C520,359.831861 510.300104,366 498.333333,366 L21.6666667,366 Z M136.835938,64 L136.835937,126 L107.25,126 L107.25,251 L40.75,251 L40.75,126 L-5.68434189e-14,126 L-5.68434189e-14,64 L136.835938,64 Z M212,64 L212,251 L161.648438,251 L161.648438,64 L212,64 Z M378,64 L378,126 L343.25,126 L343.25,251 L281.75,251 L281.75,126 L238,126 L238,64 L378,64 Z M449.047619,189.550781 L520,189.550781 L520,251 L405,251 L405,64 L449.047619,64 L449.047619,189.550781 Z"
      />
    </svg>
  ),
  execute: (state, api) => {
    let modifyText = `### ${state.selectedText}\n`;
    if (!state.selectedText) {
      modifyText = `### `;
    }
    api.replaceSelection(modifyText);
  },
};

function MarkDown({ value, setValue }) {
  return (
    <Container>
      <MDEditor
        style={{
          backgroundColor: "#393a47",
          width: "auto",
          minWidth: "60%",
          height: "600px",
          borderRadius: "10px",
          padding: "14px 0px",
          border: "1px solid #393a47",
          color: "#fff",
          boxSizing: "border-box",
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
      {/* <hr /> */}
      <MDEditor.Markdown
        style={{
          backgroundColor: "#393a47",
          borderRadius: "10px",
          padding: "14px 14px",
          border: "1px solid #393a47",
          color: "#fff",
          height: "auto",
          overflowY: "auto",
          //   maxWidth: "40%",
          boxSizing: "border-box",
        }}
        source={value}
        rehypePlugins={[[rehypeSanitize]]}
      />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
`;

export default MarkDown;
