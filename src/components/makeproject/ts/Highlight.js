import React from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { InputCustom } from "../../makeporf/shared/_sharedStyle";

function Highlighted({ text = [] }) {
  return (
    <>
      <DivTextarea>
        {text.map((e) => {
          if (e.charAt(0) === "-") {
            return (
              <div>
                <MarkRed>{e}</MarkRed>
              </div>
            );
          }
          if (e.charAt(0) === "+") {
            return (
              <div>
                <MarkBlue>{e}</MarkBlue>
              </div>
            );
          } else {
            return <div>{e}</div>;
          }
        })}
      </DivTextarea>
    </>
  );
}

const DivTextarea = styled.div`
  width: 1120px;
  height: 500px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  resize: none;
  border: none;
  background-color: white;
  overflow: auto;
`;

const MarkRed = styled.mark`
  background-color: #ffff00;
  color: black;
  z-index: 99;
`;

const MarkBlue = styled.mark`
  background-color: #fff5b1;
  color: black;
`;

export default Highlighted;
