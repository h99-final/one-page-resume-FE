import React, { useEffect, useState } from "react";
import styled from 'styled-components';

const StackBox = (props) => {

  const [stack, setStack] = useState([]);

  const s = props.st;
  console.log(s)
  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
      console.log("체크 반영 완료");
      console.log(checked, id)
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료",);
      console.log(checked, id)
    }
  };

  return (

    <></>

  )
}

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
export default StackBox;