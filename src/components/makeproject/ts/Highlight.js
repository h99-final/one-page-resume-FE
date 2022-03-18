import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

  useEffect(() => {
    if (text.length === 0) {
      return;
    }
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
      <InputSize>
        <table>
          <Tbody>
            {value.map((e) => {
              return e;
            })}
          </Tbody>
        </table>
      </InputSize>
    </>
  );
}

const InputSize = styled.div`
  height: 300px;
  max-width: 73vw;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 0px 0px;
  resize: none;
  border: none;
  background-color: #ededed;
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
  height: 300px;
  tr {
    padding: 15px;
    text-align: left;
    pre {
      letter-spacing: 0.03em;
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