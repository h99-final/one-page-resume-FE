import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRef } from 'react';


function Highlighted({ text = [], show }) {

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

  const [ScrollY, setScrollY] = useState(0);

  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    // window 스크롤 값을 ScrollY에 저장 
  };
  useEffect(() => {
    console.log("ScrollY is ", ScrollY);
    // ScrollY가 변화할때마다 값을 콘솔에 출력 
  }, [ScrollY]);
  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    }; watch();
    // addEventListener 함수를 실행 
    return () => {
      window.removeEventListener("scroll", handleFollow);
      // addEventListener 함수를 삭제 
    };
  });

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
      <InputSize show={show} >
        <Table style={{ width: "100%" }} >
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
  /* height: ${(props) => (props.show ? "98%" : "400px")}; */
  position: relative;
  height: auto;
  width: 100%;
  max-width: 60vw;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  background-color: #2c2e39;
  /* overflow: auto; */
  overflow-x: hidden;
  color: #ffffff;
  /* word-wrap: break-word; */
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
  display: flex;
  flex-direction: column;
  tr {
    /* align-items: center; */
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
