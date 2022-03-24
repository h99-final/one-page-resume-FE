import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from "react";

function Highlighted({ text = [], show }) {
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (text.length === 0) {
      return;
    }
    let _text = [];
    text.map((e, i) => {
      return e.charAt(0) === "-"
        ? _text.push(
            <TextBody
              key={`text-${i}`}
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
              key={`text-${i}`}
              style={{
                background: "rgba(3, 218, 197, 0.7)",
              }}
            >
              {e}
            </TextBody>
          )
        : e.charAt(0) === "@"
        ? _text.push(
            <TextBody key={`text-${i}`}>
              {e}
              <hr />
            </TextBody>
          )
        : e.charAt(0) === " "
        ? _text.push(<br />)
        : _text.push(<TextBody key={`text-${i}`}>{e}</TextBody>);
    });
    setValue(_text);
  }, [text]);

  return (
    <>
      <InputSize show={show}>
        {value.map((e) => {
          return e;
        })}
      </InputSize>
    </>
  );
}

const InputSize = styled.div`
  position: relative;
  height: ${(props) => (props.show ? "98%" : "350px")};
  width: 70vw;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #2c2e39;
  color: #ffffff;
  border: 1px solid #696b7b;
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
    background: #ccc;
  }
`;

const TextBody = styled.div`
  width: 100%;
  display: block;
  overflow: hidden;
  word-break: break-all;
  // 코드가 너무 길면 개행하기 위해서 씀
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export default Highlighted;
