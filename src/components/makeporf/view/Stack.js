import React, { useEffect, useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import styled from "styled-components";
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import {
  Content,
  Label,
  FormText,
  FormTitle,
  ErrorMessage,
  StyledInput,
  MakeCenter,
  ContentCareer,
  AddButton,
  ButtonText,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import { apis } from "../../../shared/axios";
import Template from "../shared/Template";
import PreviousNext from "../shared/PreviousNext";
import { useForm } from "react-hook-form";

export const options = [
  { value: "Python", label: "Python" },
  { value: "Javascript", label: "Javascript" },
  { value: "Spring", label: "Spring" },
  { value: "C", label: "C" },
  { value: "C++", label: "C++" },
  { value: "React", label: "React" },
  { value: "iOS", label: "iOS" },
  { value: "Android", label: "Android" },
  { value: "Node.js", label: "Node.js" },
  { value: "Vue.js", label: "Vue.js" },
  { value: "Git", label: "Git" },
];

export const customStyles = {
  control: (base, state) => ({
    ...base,
    background: "white",
    // Overwrittes the different states of border
    border: "1px solid #cccccc",
    borderRadius: "10px",
    width: "70vw",
    height: "40px",
    minWidth: "600px",
    maxWidth: "1140px",
    "&:hover": {
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "red" : "blue",
    },
  }),
};

//ToDO 왜인지 모르게 API가 너무 많이감
function Stack() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const animatedComponents = makeAnimated();
  const [stack, setStack] = useState([]);
  const [addStack, setAddStack] = useState([]);

  const defaultStack = [
    "JS",
    "JAVA",
    "Python",
    "C",
    "C++",
    "iOS",
    "Android",
    "React",
    "Spring",
    "Node.js",
    "Vue.js",
    "git",
  ];

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료");
    }
  };

  function handleDelete(e) {
    setAddStack(addStack.filter((e) => e !== e.target));
  }

  useEffect(() => {
    return submitStack();
  }, []);

  const handleChange = (e) => {
    let stackArray = [];
    e.map((addStack) => {
      return stackArray.push(addStack.value);
    });
    setAddStack(stackArray);
  };

  useEffect(() => {
    apis.userInfo().then((res) => {
      let mainStack = res.data.data.stack;
      setStack(mainStack);
    });
    apis.stackGet(userInfo.porfId).then((res) => {
      setAddStack(res.data.data.subStack);
    });
  }, []);

  const submitStack = async () => {
    const data = {
      stack: stack,
    };
    console.log(data);
    const addS = {
      stack: addStack,
    };
    if (stack.length === 3) {
      await apis
        .putStack(data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

    if (addStack.length > 2) {
      await apis
        .porfStack(addS)
        .then((response) => {
          console.log(response);
        })
        .catch((res) => {
          window.alert(res.error.message);
        });
    }
  };

  return (
    <>
      <FormTitle>
        <FormText>기술 스택</FormText>
      </FormTitle>
      <Font
        style={{ color: "inherit", textAlign: "left", marginLeft: "205px" }}
      >
        나를 대표하는 프레임워크 3가지를 골라주세요. 유저님의 포트폴리오를
        대표하는 명함에 들어가게 됩니다.
      </Font>

      <MultiContent>
        <Label>
          <Font>대표 스택</Font>
        </Label>
        <StackBox>
          {defaultStack.map((s, index) => {
            return (
              <StyledBox key={index}>
                <input
                  type="checkbox"
                  id={s}
                  checked={stack?.includes(`${s}`) ? true : false}
                  onChange={(e) => {
                    changeHandler(e.currentTarget.checked, `${s}`);
                  }}
                />
                <label id={s} htmlFor={s}>
                  <span>
                    <img
                      alt=""
                      src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
                    />
                    {s}
                  </span>
                </label>
              </StyledBox>
            );
          })}
        </StackBox>
      </MultiContent>
      {stack?.length > 3 ? (
        <ErrorMessage style={{ color: "red", textAlign: "center" }}>
          3가지만 골라주세요
        </ErrorMessage>
      ) : (
        <Font style={{ color: "inherit", textAlign: "center" }}></Font>
      )}
      <MultiContent>
        <Label>
          <Font>기술 스택</Font>
        </Label>
        <Select
          styles={customStyles}
          closeMenuOnSelect={false}
          components={animatedComponents}
          options={options}
          isMulti
          onChange={handleChange}
        />
      </MultiContent>
      <MultiContent>
        <Label>
          <Font></Font>
        </Label>
        <StackBox style={{ marginBottom: "60px" }}>
          {addStack.map((addStack, index) => {
            return (
              <SelectStack key={index} {...addStack}>
                {addStack}
                <ClearIcon
                  id={addStack}
                  sx={{
                    fontSize: 14,
                    color: grey[500],
                    marginLeft: 1,
                    borderRadius: 10,
                  }}
                  onClick={handleDelete}
                ></ClearIcon>
              </SelectStack>
            );
          })}
        </StackBox>
      </MultiContent>
      <MakeCenter style={{ marginTop: "20px" }}>
        <AddButton onClick={submitStack}>
          <ContentCareer>
            <ButtonText>+ 직무 경험 추가 하기</ButtonText>
          </ContentCareer>
        </AddButton>
      </MakeCenter>
      <PreviousNext />
      <Template />
    </>
  );
}

export const StackBox = styled.div`
  margin: 10px 0px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: white;
`;

export const SelectStack = styled.button`
  margin: 15px 15px;
  padding: 10px;
  width: fit-content;
  height: 50px;
  font-size: 17px;
  border: 1px solid #cccccc;
  border-radius: 100px;
  text-align: center;
`;

export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px 0px 50px;
`;
const Wrap = styled.div`
  padding-bottom: 20px;
`;

const StyledBox = styled.button`
  border: none;
  background-color: white;
  padding: 10px 15px 10px 15px;
  margin-top: 5px;
  border-radius: 10px;
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
    border: 2px solid #cccccc;
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
