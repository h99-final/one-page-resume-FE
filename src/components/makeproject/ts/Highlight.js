import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from "react";

function Highlighted({ text = [], show, height, fontcolor }) {
  const [value, setValue] = useState([]);
  const [elementHeight, setElementHeight] = useState();

  useEffect(() => {
    if (text.length === 0) {
      return;
    }
    let _text = [];
    text.map((e, i) => {
      return e.charAt(0) === "-"
        ? _text.push(
            <TextBody
              key={`text-red-${i}`}
              style={{
                background: "rgba(255, 155, 0, 0.7)",
              }}
            >
              {e}
            </TextBody>
          )
        : e.charAt(0) === "+"
        ? _text.push(
            <TextBody
              key={`text-blue-${i}`}
              style={{
                background: "rgba(3, 218, 197, 0.7)",
              }}
            >
              {e}
            </TextBody>
          )
        : e.charAt(0) === "@"
        ? _text.push(
            <TextBody key={`text-title-${i}`}>
              {e}
              <hr />
            </TextBody>
          )
        : e.charAt(0) === " "
        ? _text.push(<br />)
        : _text.push(<TextBody key={`text-normal-${i}`}>{e}</TextBody>);
    });
    setValue(_text);
  }, [text]);

  return (
    <>
      <InputSize fontcolor={fontcolor} show={show} height={height}>
        {value.map((e) => {
          return e;
        })}
      </InputSize>
    </>
  );
}

const InputSize = styled.div`
  /* position: relative; */
  height: ${(props) =>
    props.show
      ? props.height > 600
        ? `calc(${props.height}px - 9vw - 40px)`
        : // "500px"
          "600px"
      : "350px"};
  width: ${(props) => (props.show ? "" : "auto")};
  min-width: auto;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: "#2c2e39";
  border-radius: ${(props) => (props.show ? "0px" : "10px")};
  border: 1px solid
    ${(props) => (props.show ? `${props.fontcolor}` : "#696B7B")};
  overflow: auto;
  &:focus {
    outline: none !important;
    border-color: #719ece !important;
    box-shadow: 0 0 10px #719ece !important;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background: #696b7b;
  }
`;

const TextBody = styled.div`
  width: 100%;
  display: block;
  padding: 2px 0px;
  align-items: center;
  overflow: hidden;
  word-break: break-all;
  // 코드가 너무 길면 개행하기 위해서 씀
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export default Highlighted;
