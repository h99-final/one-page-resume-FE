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

  const handleChange = (e) => {
    let stackArray = [];
    e.map((stack) => {
      return stackArray.push(stack.value);
    });
    setStack(stackArray);
  };

  useEffect(() => {
    console.log("axios 스택 보내기");
    console.log(stack)
  }, [stack]);
  return (
    <>
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


export default Stack;
