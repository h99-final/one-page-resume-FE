import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  Star,
  SuccessMessage,
} from "../shared/_sharedStyle";
import { Font } from "./Introduce";
import { apis } from "../../../shared/axios";
import Template from "../shared/Template";
import PreviousNext from "../shared/PreviousNext";
import { useForm } from "react-hook-form";
// mui select
import ClearIcon from "@mui/icons-material/Clear";
import { grey } from "@mui/material/colors";
import {
  Autocomplete,
  Chip,
  FormControl,
  Popper,
  TextField,
} from "@mui/material";
import { option } from "../../../shared/common";
import { CssTextField, theme } from "../../../shared/_sharedMuiStyle";
//redux
import { useDispatch } from "react-redux";
import { actionCreators as userActions } from "../../../redux/modules/user";
import { useHistory } from "react-router-dom";
import "../../banner.css";

function Stack() {
  const { handleSubmit } = useForm();
  const defaultStack = [
    "HTML",
    "JS",
    "CSS",
    "SCSS",
    "TS",
    "Java",
    "Python",
    "C",
    "C++",
    "iOS",
    "Android",
    "React",
    "React-Native",
    "django",
    "Spring",
    "Node.js",
    "Next.js",
    "Vue.js",
    "git",
    "Github",
    "jQuery",
    "C#",
    "Flask",
    "Express",
  ];

  const dispatch = useDispatch();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const history = useHistory();
  const [stack, setStack] = useState([]);
  const [addStack, setAddStack] = useState([]);
  const [success, setSucess] = useState("");

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
    } else {
      setStack(stack.filter((e) => e !== id));
    }
  };

  const handleChange = (event, newValue) => {
    setAddStack(newValue);
  };

  const handleDelete = (stack) => {
    setAddStack(addStack.filter((prev) => prev !== stack));
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
    const addS = {
      stack: addStack,
    };

    if (stack.length === 3 && addStack.length > 0) {
      await apis
        .porfStack(addS)
        .then((response) => {
          setSucess("저장되었습니다.");
        })
        .catch((res) => {
          window.alert("저장 실패하였습니다.");
        });
      await apis
        .putStack(data)
        .then(() => {
          setSucess("저장되었습니다.");
        })
        .catch((error) => {
          window.alert("저장 실패하였습니다.");
        });
      history.push(`/write/portfolio/career/${userInfo.porfId}`)
    }
    else {
      setSucess("필수정보를 입력해주세요.")
    }

  };

  return (
    <>
      <FormTitle style={{ display: "flex", justifyContent: "left" }}>
        <FormText>기술 스택</FormText>

        <Font
          style={{
            color: "#CFD3E2",
            textAlign: "left",
            margin: "0px 0px 0px 10px",
          }}
        >
          나를 대표하는 프레임워크 3가지를 골라주세요. 유저님의 포트폴리오를
          대표하는 명함에 들어가게 됩니다.
        </Font>
      </FormTitle>

      {/* <form onSubmit={handleSubmit(submitStack)}> */}
      <MultiContent>
        <Label>
          <Font>
            대표 스택<Star>*</Star>
          </Font>
        </Label>
        <StackBox>
          {defaultStack.map((s, index) => {
            return (
              <StyledBox key={`stack-${index}`}>
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
                    {s === "C++" ? (
                      <img
                        alt=""
                        src="https://s3.amazonaws.com/www.poug.me/stack/C%2B%2B.png"
                      />
                    ) : s === "C#" ? (
                      <img
                        alt=""
                        src="https://s3.amazonaws.com/www.poug.me/stack/C%23.png"
                      />
                    ) : (
                      <img
                        alt=""
                        src={`https://s3.amazonaws.com/www.poug.me/stack/${s}.png`}
                      />
                    )}
                    {s}
                  </span>
                </label>
              </StyledBox>
            );
          })}
        </StackBox>
      </MultiContent>
      {stack?.length !== 3 ? (
        <ErrorMessage
          style={{
            color: "orange",
            justifyContent: "left",
            marginLeft: "217px",
          }}
        >
          3가지를 골라주세요
        </ErrorMessage>
      ) : (
        <Font style={{ color: "inherit", textAlign: "center" }}></Font>
      )}
      <MultiContent style={{ marginTop: "70px" }}>
        <Label style={{ height: "auto" }}>
          <Font style={{ margin: "0px 10px " }}>기술 스택</Font>
        </Label>
        <Autocomplete
          multiple
          fullWidth
          filterSelectedOptions
          id="tags-standard"
          options={option}
          value={addStack}
          defaultValue={addStack}
          onChange={handleChange}
          renderTags={(addStack, getTagProps) =>
            addStack.map((option, index) => (
              <Chip
                sx={{ display: "none" }}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <CssTextField
              variant="standard"
              {...params}
              placeholder="기술스택으로 검색해보세요"
            />
          )}
        />
      </MultiContent>
      <MultiContent>
        <Label>
          <Font></Font>
        </Label>
        <StackBox
          style={{
            marginBottom: "60px",
            marginTop: "20px",
            height: "100%",
            width: "100%",
            background: "#393a47",
          }}
        >
          {addStack.map((addStack, index) => {
            return (
              <SelectStack key={index} {...addStack}>
                {addStack}
                <ClearIcon
                  style={{ cursor: "pointer" }}
                  id={addStack}
                  sx={{
                    fontSize: 14,
                    color: grey[500],
                    marginLeft: 1,
                    borderRadius: 10,
                  }}
                  onClick={() => handleDelete(addStack)}
                ></ClearIcon>
              </SelectStack>
            );
          })}
        </StackBox>
      </MultiContent>
      <MakeCenter
        style={{ marginBottom: "10px" }}
        onClick={submitStack}
      // onClick={() => history.push(`/write/project/info`)}
      >
        <AddButton>
          <ContentCareer>
            <ButtonText>적용하기</ButtonText>
          </ContentCareer>
        </AddButton>
      </MakeCenter>
      <SuccessMessage>{success}</SuccessMessage>
      <Template submitStack={submitStack} stack={stack} />
      {/* </form> */}
      {/* <MakeCenter style={{ marginTop: "20px" }}>
        <AddButton onClick={submitStack}>
          <ContentCareer>
            <ButtonText>+ 스택 저장 하기</ButtonText>
          </ContentCareer>
        </AddButton>
      </MakeCenter> */}
      <PreviousNext />
    </>
  );
}

export const StackBox = styled.div`
  /* margin: 10px 0px; */
  border-radius: 5px;
  border: 1px solid #2c2e39;
  background-color: #2c2e39;
`;

export const SelectStack = styled.button`
  margin: 15px 15px;
  padding: 10px 20px;

  width: fit-content;
  height: 50px;
  font-size: 17px;
  color: white;
  background-color: #393a47;
  border: 1px solid white;
  border-radius: 100px;
  text-align: center;
`;

export const MultiContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 50px 0px 50px;
`;

const StyledBox = styled.button`
  border: none;
  background-color: #2c2e39;
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
    vertical-align: middle;
    font-size: 14px;
    position: relative;
    align-items: center;
    text-align: center;
    top: 20%;
  }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 10px;
    background-color: #393a47;
    border: 2px solid #393a47;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color: white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 10px;
    background-color: #00c4b4;
    border: 2px solid #00c4b4;
    cursor: pointer;
  }
`;
export default Stack;
