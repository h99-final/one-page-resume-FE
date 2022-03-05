import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

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
    console.log(stack);
  }, [stack]);
  return (
    <>
      <div>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={options}
          isMulti
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Stack;
