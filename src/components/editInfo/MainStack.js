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
  ErrorMessage,
  FormText,
  FormTitle,
  InputCustom,
  Label,
  Font,
  Star
} from "../makeporf/shared/_sharedStyle";
import { apis } from "../../shared/axios";
import { useHistory } from 'react-router-dom';

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

function MainStack() {
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [stack, setStack] = useState(userInfo.stack);

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
      console.log("체크 반영 완료");
      console.log(checked);
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료");
    }
  };

  useEffect(() => {
    apis.userInfo().then((res) => {
      let mainStack = res.data.data.stack;
      setStack(mainStack);
    });
  }, []);

  const submitStack = async () => {
    const data = {
      stack: stack,
    };
    console.log(data);
    if (stack.length === 3) {
      await apis
        .putStack(data)
        .then((res) => {
          alert("변경 완료")
          history.push('/mypage')
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }
  };

  return (
    <>
      <FormTitle>
        <FormText>기술 스택</FormText>
      </FormTitle>
      <Font
        style={{ color: "#CFD3E2", textAlign: "left", marginLeft: "205px" }}
      >
        나를 대표하는 프레임워크 3가지를 골라주세요. 유저님의 포트폴리오를
        대표하는 명함에 들어가게 됩니다.
      </Font>

      <MultiContent>
        <Label>
          <Font>대표 스택<Star>*</Star></Font>
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
                ></input>
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
        <Font style={{ color: "orange", textAlign: "center" }}>
          3가지만 골라주세요
        </Font>
      ) : (
        <Font style={{ color: "inherit", textAlign: "center" }}></Font>
      )}
      <div style={{ width: "96%", textAlign: "right" }}>
        <Button onClick={submitStack}>변경 내용 저장</Button>
      </div>
    </>
  );
}

export const StackBox = styled.div`
  margin: 10px 0px;
  height: auto;
  border-radius: 10px;
  border: 1px solid #2C2E39;
  background-color: #2C2E39;
`;

export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px 0px 50px;
`;
const Button = styled.button`
  width: 150px;
  height: 60px;
  background-color: #00C4B4;
  color: white;
  border-radius: 43px;
  border: none;
  position: relative;
  margin-bottom: 10px;
`;
const StyledBox = styled.button`
  border: none;
  background-color: #2C2E39;
  padding: 10px 15px 10px 15px;
  margin-top: 5px;
  border-radius: 10px;
  color: white;
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
    background-color: #393A47;
    border: 2px solid #393A47;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color: white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    background-color: #00C4B4;
    border: 2px solid #00C4B4;
    cursor: pointer;
  }
`;
export default MainStack;
