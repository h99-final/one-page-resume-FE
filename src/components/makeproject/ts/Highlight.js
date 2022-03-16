import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import { InputCustom, StyledInput } from "../../makeporf/shared/_sharedStyle";
import HighlightWithinTextarea from "react-highlight-within-textarea";

function Highlighted({ text = [] }) {
  // const [value, setValue] = useState(text.join("\n\n"));

  // const handleChange = (value) => setValue(value);

  // let highlightRed = [];
  // let highlightBlue = [];

  // let highlight = [
  //   {
  //     highlight: highlightRed,
  //     className: "red",
  //   },
  //   {
  //     highlight: highlightBlue,
  //     className: "blue",
  //   },
  // ];

  // const highlightText = () => {
  //   text.map((e) => {
  //     return e.charAt(0) === "-"
  //       ? highlightRed.push(e + "\n")
  //       : e.charAt(0) === "+"
  //       ? highlightBlue.push(e + "\n")
  //       : e;
  //   });
  //   return highlight;
  // };
  const [value, setValue] = useState([]);

  console.log(value);

  useEffect(() => {
    let _text = [];
    text.map((e) => {
      return e.charAt(0) === "-"
        ? _text.push(
            <tr style={{ backgroundColor: "#ffc9c9" }}>
              <pre>{e}</pre>
            </tr>
          )
        : e.charAt(0) === "+"
        ? _text.push(
            <tr style={{ backgroundColor: "#a3daff" }}>
              <pre>{e}</pre>
            </tr>
          )
        : e.charAt(0) === "@"
        ? _text.push(
            <>
              <br />
              <br />
              <pre>{e}</pre>
              <hr />
            </>
          )
        : _text.push(<pre>{e}</pre>);
    });
    setValue(_text);
  }, [text]);

  return (
    <>
      <Table>
        <Tbody>
          {value.map((e) => {
            return e;
          })}
        </Tbody>
      </Table>
    </>
  );
}

const Table = styled.table``;

const Tbody = styled.tbody`
  tr {
    padding: 15px;
    text-align: left;
  }
`;

const Area = styled.div`
  height: 400px;
  border: 1px solid black;
  text-align: left;
  padding: 5px;
  overflow: scroll;
  .red {
    background-color: #ffc9c9 !important;
  }
  .blue {
    background-color: #a3daff !important;
  }
`;

export default Highlighted;
