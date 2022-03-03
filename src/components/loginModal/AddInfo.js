import { current } from "immer";
import React, { useState } from "react";
import styled from "styled-components";
import { phoneCheck, urlCheck, nameCheck } from "../../shared/common";
// import { actionCreators as userActions } from "../redux/modules/user";
import { apis } from "../../shared/axios";
import { TextField } from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import {
  actionCreators,
  actionCreators as userActions,
} from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const AddInfo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginClose = props.loginClose
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [gitUrl, setGitUrl] = React.useState("");
  const [blogUrl, setBlogUrl] = React.useState("");
  const [job, setJob] = React.useState("");

  const [page, setPage] = React.useState("0");

  const [nameError, setNameError] = React.useState("");
  const [phoneNumError, setPhoneNumError] = React.useState("");
  const [gitUrlError, setGitUrlError] = React.useState("");
  const [jobError, setJobError] = React.useState("");

  const [stack, setStack] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
      console.log("체크 반영 완료");
    } else {
      setStack(stack.filter((e) => e !== id));
      console.log("체크 해제 반영 완료");
    }
  };
  console.log(stack);

  const isAllChecked = stack.length === 2;
  const disabled = !isAllChecked;

  const goNext = () => {

    if (!nameCheck(name) || name.length < 2) {
      setNameError("이름을 입력해주세요");
      return;
    }
    setNameError("");

    // if (!phoneCheck(phoneNum)) {
    //   setPhoneNumError("올바른 번호를 입력하세요");
    //   return;
    // }
    // setPhoneNumError("");

    if (!urlCheck(gitUrl) || gitUrl.length < 0) {
      setGitUrlError("URL형식이 잘못되었습니다.");
      return
    }
    setGitUrlError("");

    // if (!nameCheck(job) || job.length < 2) {
    //   setJobError("직업을 입력해주세요")
    //   return;
    // } else setJobError("");

    setPage("2");
  };
  const addInfo = () => {
    console.log(name, stack, phoneNum, gitUrl, blogUrl);

    dispatch(userActions.userInfoDB(name, stack, phoneNum, gitUrl, blogUrl));
    loginClose(false)
  };

  return (
    <>
      {page === "0" && (
        <Wrap>
          <h2>추가정보를 입력하시겠어요?</h2>

          <p>회원가입을 완료했어요!</p>
          <p>추가정보를 3가지만 입력하면</p>
          <p>Portfolio의 다양한 기능을 이용할 수 있어요.</p>
          <p>최신 프로젝트까지 추천드릴께요.</p>
          <div>
            <span>
              <WriteeBtn
                onClick={() => {
                  window.location.replace("/");
                }}
              >
                안하기
              </WriteeBtn>
            </span>
            <WriteBtn
              onClick={() => {
                setPage("1");
              }}
            >
              추가정보 입력하기
            </WriteBtn>
          </div>
        </Wrap>
      )}
      {page === "1" && (
        <Wrap>
          <h2>추가정보 입력하기 (1/2)</h2>
          <p>Portfolio와 함께 멋진 포트폴리오를 만들어보세요.</p>
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            variant='standard'
            fullWidth
            id='name'
            name='name'
            label='이름'
            error={nameError !== "" || false}
          />
          {nameError && (
            <span style={{ fontSize: "12px", color: "red" }}>{nameError}</span>
          )}

          <br />
          <br />

          <TextField
            onChange={(e) => {
              setGitUrl(e.target.value);
            }}
            required
            variant='standard'
            fullWidth
            id='gitURL'
            name='gitURL'
            label='gitURL'
            error={gitUrlError !== "" || false}
          />
          {gitUrlError && (
            <span style={{ fontSize: "12px", color: "red" }}>
              {gitUrlError}
            </span>
          )}
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setBlogUrl(e.target.value);
            }}
            variant='standard'
            fullWidth
            id='blogurl'
            name='blogurl'
            label='blogURl'
          // error={blogUrlError !== '' || false}
          />
          {/* {blogUrlError && <span style={{ fontSize: "12px", color: "red" }}>{blogUrlError}</span>} */}
          <TextField
            onChange={(e) => {
              setPhoneNum(e.target.value);
            }}
            variant='standard'
            fullWidth
            id='phone'
            name='phone'
            label='전화번호'
          // error={phoneNumError !== "" || false}
          />
          {/* {phoneNumError && (
            <span style={{ fontSize: "12px", color: "red" }}>
              {phoneNumError}
            </span>
          )} */}
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setJob(e.target.value);
            }}
            variant='standard'
            fullWidth
            id='job'
            name='job'
            label='직무'
          // error={jobError !== "" || false}
          />
          {/* {jobError && (
            <span style={{ fontSize: "12px", color: "red" }}>{jobError}</span>
          )} */}
          <div>
            <WriteBtn
              disabled={!name || !gitUrl ? true : false}
              onClick={goNext}
            >
              다음{">"}
            </WriteBtn>
          </div>
        </Wrap>
      )}
      {page === "2" && (
        <Wrap>
          <h2>3가지 고르세요(2/2)</h2>
          <p>Portfolio 추천 프로젝트에 반영될 수 있어요!</p>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='JS'
                checked={stack.includes("JS") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "JS");
                }}

              ></input>
              <label id='JS' htmlFor='JS'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  JS
                </span>
              </label>
            </StyledBox>

            <StyledBox>
              <input
                type='checkbox'
                id='JAVA'
                checked={stack.includes("JAVA") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "JAVA");
                }}
              ></input>
              <label id='JAVA' htmlFor='JAVA'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  JAVA
                </span>
              </label>
            </StyledBox>

            <StyledBox>
              <input
                type='checkbox'
                id='PYTHON'
                checked={stack.includes("PYTHON") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "PYTHON");
                }}
              ></input>
              <label id='PYTHON' htmlFor='PYTHON'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  PYTHON
                </span>
              </label>
            </StyledBox>
          </Grid>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='C'
                checked={stack.includes("C") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "C");
                }}
              ></input>
              <label id='C' htmlFor='C'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  C
                </span>
              </label>
            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='C++'
                checked={stack.includes("C++") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "C++");
                }}
              ></input>
              <label id='C++' htmlFor='C++'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  C++
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='iOS'
                checked={stack.includes("iOS") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "iOS");
                }}
              ></input>
              <label id='iOS' htmlFor='iOS'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  iOS
                </span>
              </label>

            </StyledBox>
          </Grid>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='Android'
                checked={stack.includes("Android") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Android");
                }}
              ></input>
              <label id='Android' htmlFor='Android'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Android
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='REACT'
                checked={stack.includes("REACT") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "REACT");
                }}
              ></input>
              <label id='REACT' htmlFor='REACT'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  REACT
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='Spring'
                checked={stack.includes("Spring") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Spring");
                }}
              ></input>
              <label id='Spring' htmlFor='Spring'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Spring
                </span>
              </label>

            </StyledBox>
          </Grid>
          <Grid>
            <StyledBox>
              <input
                type='checkbox'
                id='Node.js'
                checked={stack.includes("Node.js") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Node.js");
                }}
              ></input>
              <label id='Node.js' htmlFor='Node.js'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Node.js
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='Vue.js'
                checked={stack.includes("Vue.js") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Vue.js");
                }}
              ></input>
              <label id='Vue.js' htmlFor='Vue.js'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Vue.js
                </span>
              </label>

            </StyledBox>
            <StyledBox>
              <input
                type='checkbox'
                id='Git'
                checked={stack.includes("Git") ? true : false}
                onChange={(e) => {
                  changeHandler(e.currentTarget.checked, "Git");
                }}
              ></input>
              <label id='Git' htmlFor='Git'>
                <span>
                  <img alt='' src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png' />
                  Git
                </span>
              </label>

            </StyledBox>
          </Grid>
          <div>
            <WriteBtn
              disabled={stack.length < 3 ? true : false}
              onClick={addInfo}
            >
              가입하기
            </WriteBtn>
          </div>
        </Wrap>
      )}
    </>
  );
};

export default AddInfo;

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
  span{
    font-size: 20px;
    position: relative;
    top: 20%;
  }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: 2px solid #bcbcbc;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color:white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    background-color: #555555;
    border: 2px solid #555555;
    cursor: pointer;
  }
`;
const Grid = styled.div`
  
  padding-bottom: 20px;
`;
const WriteBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 10%;
  top: 80%;
  border-radius: 25px;
  margin: 15px 0px 0px 5px;
  font-size: 17px;
  padding: 10px 10px;
  border: 1px none;
  border-radius: 25px;
  color: white;
  background-color: black;
  :disabled {
    border: none;
    background-color: gray;
  }
`;

const WriteeBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 78%;
  top: 80%;
  border-radius: 25px;
  margin: 15px 0px 0px 5px;
  font-size: 17px;
  padding: 10px 10px;
  border: 1px none;
  border-radius: 25px;
  color: white;
  background-color: black;
  :disabled {
    border: none;
    background-color: gray;
  }
`;

const Wrap = styled.div`
  padding: 10px;
  margin: 90px 0px 0px 0px;
`;
