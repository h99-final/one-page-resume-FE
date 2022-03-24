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
    text.map((e) => {
      return e.charAt(0) === "-"
        ? _text.push(
            <tr style={{ background: "rgba(255, 155, 0, 0.5)" }}>
              <pre>{e}</pre>
            </tr>
          )
        : e.charAt(0) === "+"
        ? _text.push(
            <tr style={{ background: "rgba(3, 218, 197, 0.5)" }}>
              <td>
                <pre>{e}</pre>
              </td>
            </tr>
          )
        : e.charAt(0) === "@"
        ? _text.push(
            <>
              <td>
                <pre>{e}</pre>
              </td>
              <hr />
            </>
          )
        : _text.push(
            <td>
              <pre>{e}</pre>
            </td>
          );
    });
    setValue(_text);
  }, [text]);

  return (
    <>
      <InputSize show={show}>
        <Table style={{ width: "100%" }}>
          <Tbody>
            {value.map((e) => {
              return e;
            })}
          </Tbody>
        </Table>
      </InputSize>
    </>
  );
}

const Table = styled.table`
  /* display: flex; */
  /* flex-direction: column; */
  width: 80%;
`;

const InputSize = styled.div`
  position: relative;
  height: auto;
  width: 100%;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #2c2e39;
  color: #ffffff;
  overflow: auto;
  &:focus {
    outline: none !important;
    border-color: #719ece !important;
    box-shadow: 0 0 10px #719ece !important;
  }
  &::-webkit-scrollbar-track {
    background-color: #ededed; /*스크롤바의 색상*/
  }
`;

const Tbody = styled.tbody`
  height: 100%;
  display: inline;
  flex-direction: column;
  tr {
    text-align: left;
    color: #ffffff;
    letter-spacing: 0.1em;
    word-wrap: break-word;
    pre {
      /* padding: 3px; */
      text-decoration-color: #ffffff;
      letter-spacing: 0.1em;
      word-wrap: break-word;
    }
  }
`;

const Area = styled.div`
  height: 400px;
  border: 1px solid black;
  text-align: left;
  padding: 5px;
  overflow: scroll;
  .red {
    background-color: #fcedeb !important;
  }
  .blue {
    background-color: #ebfeed !important;
  }
`;

export default Highlighted;
