import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import styled from 'styled-components';
import ClearIcon from '@mui/icons-material/Clear';
import { grey } from '@mui/material/colors'

import Grid from '@mui/material/Grid';
export const options = [
  { value: "python", label: "python" },
  { value: "javascript", label: "javascript" },
  { value: "spring", label: "spring" },
];

function Stack() {
  const animatedComponents = makeAnimated();
  const [stack, setStack] = useState([]);
  const [addStack, setAddStack] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
      console.log("체크 반영 완료");
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료");
    }
  };

  const handleChange = (e) => {
    let stackArray = [];
    e.map((stack) => {
      return stackArray.push(stack.value);
    });
    setStack(stackArray);
  };

  useEffect(() => {
    console.log("axios 스택 보내기");
  }, [stack]);
  return (
    <>
      <Wrap style={{ paddingTop: "20px" }}>
        <StyledBox>
          <input
            type="checkbox"
            id="JS"
            checked={stack.includes("JS") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "JS");
            }}
          ></input>
          <label id="JS" htmlFor="JS">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              JS
            </span>
          </label>
        </StyledBox>

        <StyledBox>
          <input
            type="checkbox"
            id="JAVA"
            checked={stack.includes("JAVA") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "JAVA");
            }}
          ></input>
          <label id="JAVA" htmlFor="JAVA">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              JAVA
            </span>
          </label>
        </StyledBox>

        <StyledBox>
          <input
            type="checkbox"
            id="PYTHON"
            checked={stack.includes("PYTHON") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "PYTHON");
            }}
          ></input>
          <label id="PYTHON" htmlFor="PYTHON">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              PYTHON
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="C"
            checked={stack.includes("C") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "C");
            }}
          ></input>
          <label id="C" htmlFor="C">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              C
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="C++"
            checked={stack.includes("C++") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "C++");
            }}
          ></input>
          <label id="C++" htmlFor="C++">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              C++
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="iOS"
            checked={stack.includes("iOS") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "iOS");
            }}
          ></input>
          <label id="iOS" htmlFor="iOS">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              iOS
            </span>
          </label>
        </StyledBox>
      </Wrap>
      <Wrap>
        <StyledBox>
          <input
            type="checkbox"
            id="Android"
            checked={stack.includes("Android") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "Android");
            }}
          ></input>
          <label id="Android" htmlFor="Android">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              Android
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="REACT"
            checked={stack.includes("REACT") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "REACT");
            }}
          ></input>
          <label id="REACT" htmlFor="REACT">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              REACT
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="Spring"
            checked={stack.includes("Spring") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "Spring");
            }}
          ></input>
          <label id="Spring" htmlFor="Spring">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              Spring
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="Node.js"
            checked={stack.includes("Node.js") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "Node.js");
            }}
          ></input>
          <label id="Node.js" htmlFor="Node.js">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              Node.js
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="Vue.js"
            checked={stack.includes("Vue.js") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "Vue.js");
            }}
          ></input>
          <label id="Vue.js" htmlFor="Vue.js">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              Vue.js
            </span>
          </label>
        </StyledBox>
        <StyledBox>
          <input
            type="checkbox"
            id="Git"
            checked={stack.includes("Git") ? true : false}
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "Git");
            }}
          ></input>
          <label id="Git" htmlFor="Git">
            <span>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
              />
              Git
            </span>
          </label>
        </StyledBox>
      </Wrap>
      <div style={{ width: "1120px" }}>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={options}
          isMulti
          onChange={handleChange}
        />
        <StackBox>
          {stack.map((stack, index) => {
            return (
              <SelectStack key={index}{...stack}>
                {stack}
                <ClearIcon
                  sx={{ fontSize: 14, color: grey[500], marginLeft: 1 }} onClick={() => { alert("@@") }}></ClearIcon>
              </SelectStack>
            )
          })}

        </StackBox>
      </div>
    </>
  );
}

const StackBox = styled.div`
  margin: 10px 0px;
  width: 1120px;
  height: 160px;
  border-radius: 10px;
  border: 1px solid;
  background-color: white;
`;

const SelectStack = styled.button`
  margin: 15px 15px;
  padding: 10px;
  width: 145px;
  height: 40px;
  font-size: 17px;
  border: 1px solid #cccccc;
  border-radius: 100px;
  text-align: center;
`;

const Wrap = styled.div`
  padding-bottom: 20px;
`;

const StyledBox = styled.span`
  padding: 0px 5px 0px 5px;
  img {
    border-radius: 5px;
    background-color: gray;
    width: 20px;
    height: 20px;
    position: relative;
    top: 5%;
    padding: 1px;
    object-fit: cover;
    margin-right: 5px;
    margin-left: 15px;
  }
  input[type="checkbox"] {
    display: none;
  }
  span {
    font-size: 20px;
    position: relative;
    top: 20%;
  }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: 2px solid #333333;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color: white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    background-color: #333333;
    border: 2px solid #333333;
    cursor: pointer;
  }
`;
export default Stack;
