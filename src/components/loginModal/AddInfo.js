import React, { useState } from "react";
import styled from "styled-components";
import { phoneCheck, urlCheck, nameCheck } from "../../shared/common";

import { apis } from "../../shared/axios";

import { TextField } from "@mui/material";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { orange } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    error: orange,
  },
});

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor,
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focuscolor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor,
    },
  },
  "& .MuiInputBase-input": {
    position: "relative",
    color: "white",
    width: "100%",
    borderBottom: "1px solid white",
  },
  "& input:valid + fieldset": {},
  "& input:invalid + fieldset": {},
  "& input:valid:focus + fieldset": {
    // override inline-style
  },
}));

const AddInfo = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginClose = props.loginClose;
  const [name, setName] = React.useState("");
  const [phoneNum, setPhoneNum] = React.useState("");
  const [gitUrl, setGitUrl] = React.useState("");
  const [blogUrl, setBlogUrl] = React.useState("");
  const [job, setJob] = React.useState("");

  const [page, setPage] = React.useState("0");

  const [nameError, setNameError] = React.useState("");
  const [gitUrlError, setGitUrlError] = React.useState("");

  const [stack, setStack] = useState([]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setStack([...stack, id]);
    } else {
      setStack(stack.filter((e) => e !== id));
    }
  };

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
    "django",
    "Spring",
    "Node.js",
    "Next.js",
    "Vue.js",
    "React-Native",
    "git",
    "Github",
    "jQuery",
    "C#",
    "Flask",
    "Express",
  ];

  const goNext = () => {
    if (!nameCheck(name) || name.length < 2) {
      setNameError("이름을 입력해주세요");
      return;
    }
    setNameError("");
    if (!urlCheck(gitUrl) || gitUrl.length < 0) {
      setGitUrlError("URL형식이 잘못되었습니다.");
      return;
    }
    setGitUrlError("");
    setPage("2");
  };
  const addInfo = () => {
    const data = {
      name: name,
      phoneNum: phoneNum,
      gitUrl: gitUrl,
      blogUrl: blogUrl,
      job: job,
      stack: stack,
    };
    const _data = {
      stack: stack,
    };
    dispatch(userActions.addInfoDB(data));
    apis.putStack(_data).then((res) => {
      window.location.reload();
    });
  };

  return (
    <>
      {page === "0" && (
        <>
          <TextContainer style={{ marginBottom: "70px" }}>
            <h1>추가정보를 입력하시겠어요?</h1>
          </TextContainer>
          <ImgInputBox>
            <img
              alt=""
              src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/111.png"
            />
            <p>회원가입을 완료했어요👏👏</p>
            <p>추가정보를 3가지만 입력하면</p>
            <p>포그를 제대로 이용할 수 있어요.</p>
            <p>포트폴리오 제작은 물론</p>
            <p>최신 프로젝트까지 추천해 드릴게요.</p>
          </ImgInputBox>
          <div>
            <span>
              <CloseBtn
                onClick={() => {
                  history.go(0);
                }}
              >
                다음에 할게요
              </CloseBtn>
            </span>
            <ContinueBtn
              onClick={() => {
                setPage("1");
              }}
            >
              추가정보 입력하기
            </ContinueBtn>
          </div>
        </>
      )}
      {page === "1" && (
        <>
          <TextContainer>
            <h1>추가정보 입력하기 (1/2)</h1>
            <p>몇가지 정보만 더 기입하면 돼요!</p>
          </TextContainer>
          <ThemeProvider theme={theme}>
            <InputBox>
              <CssTextField
                focuscolor="#00C4B4"
                style={{ marginTop: "55px" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                variant="standard"
                fullWidth
                id="name"
                name="name"
                placeholder="이름*"
                error={nameError !== "" || false}
              />
              {nameError && (
                <div style={{ textAlign: "left" }}>
                  <span style={{ fontSize: "14px", color: "orange" }}>
                    {nameError}
                  </span>
                </div>
              )}

              <CssTextField
                focuscolor="#00C4B4"
                onChange={(e) => {
                  setGitUrl(e.target.value);
                }}
                style={{ marginTop: "35px" }}
                required
                variant="standard"
                fullWidth
                id="gitURL"
                name="gitURL"
                placeholder="gitURL*"
                error={gitUrlError !== "" || false}
              />
              {gitUrlError && (
                <div style={{ textAlign: "left" }}>
                  <span style={{ fontSize: "14px", color: "orange" }}>
                    {gitUrlError}
                  </span>
                </div>
              )}
              <CssTextField
                focuscolor="#00C4B4"
                onChange={(e) => {
                  setBlogUrl(e.target.value);
                }}
                style={{ marginTop: "35px" }}
                variant="standard"
                fullWidth
                id="blogurl"
                name="blogurl"
                placeholder="blogURl"
              // error={blogUrlError !== '' || false}
              />
              {/* {blogUrlError && <span style={{ fontSize: "12px", color: "red" }}>{blogUrlError}</span>} */}
              <CssTextField
                autoComplete="off"
                focuscolor="#00C4B4"
                onChange={(e) => {
                  setPhoneNum(e.target.value);
                }}
                style={{ marginTop: "35px" }}
                variant="standard"
                fullWidth
                id="phone"
                name="phone"
                placeholder="전화번호"
              // error={phoneNumError !== "" || false}
              />
              {/* {phoneNumError && (
            <span style={{ fontSize: "12px", color: "red" }}>
              {phoneNumError}
            </span>
          )} */}

              <CssTextField
                focuscolor="#00C4B4"
                onChange={(e) => {
                  setJob(e.target.value);
                }}
                style={{ marginTop: "35px" }}
                variant="standard"
                fullWidth
                id="job"
                name="job"
                placeholder="직무"
              // error={jobError !== "" || false}
              />
              {/* {jobError && (
            <span style={{ fontSize: "12px", color: "red" }}>{jobError}</span>
          )} */}
              <WriteBtn
                disabled={!name || !gitUrl ? true : false}
                onClick={goNext}
              >
                다음
              </WriteBtn>
            </InputBox>
          </ThemeProvider>
        </>
      )}
      {page === "2" && (
        <>
          <TextContainer>
            <h1>
              나를 대표하는 프레임워크 <br /> 3가지를 골라주세요(2/2)
            </h1>
            <p style={{ color: "#CFD3E2" }}>
              선택하신 프레임워크와 관련된 프로젝트를 추천해드릴게요.
            </p>
          </TextContainer>

          {stack.length > 3 ? (
            <p style={{ fontSize: "14px", color: "orange" }}>
              3가지만 골라주세요
            </p>
          ) : (
            <p style={{ color: "#2C2E39", fontSize: "14px" }}>
              3가지만 골라주세요
            </p>
          )}

          {defaultStack.map((s, index) => {
            return (
              <StyleBoxLogin native={s === "React-Native" ? true : false}>
                <input
                  type="checkbox"
                  id={s}
                  checked={stack.includes(`${s}`) ? true : false}
                  onChange={(e) => {
                    changeHandler(e.currentTarget.checked, `${s}`);
                  }}
                ></input>
                <label id={s} htmlFor={s}>
                  <span native={s === "React-Native" ? true : false}>
                    {s === "C++" ? <img
                      alt=""
                      src="https://s3.amazonaws.com/www.poug.me/stack/C%2B%2B.png"
                    /> :
                      s === "C#" ? <img
                        alt=""
                        src="https://s3.amazonaws.com/www.poug.me/stack/C%23.png"
                      />
                        :
                        <img
                          alt=""
                          src={`https://s3.amazonaws.com/www.poug.me/stack/${s}.png`}
                        />
                    }

                    {s}
                  </span>
                </label>
              </StyleBoxLogin>
            );
          })}

          <div>
            <WriteBtn
              style={{
                margin: "50px 0px 0px 430px"
              }}
              disabled={stack.length !== 3 ? true : false}
              onClick={addInfo}
            >
              작성완료
            </WriteBtn>
          </div>
        </>
      )}
    </>
  );
};

export default AddInfo;

const TextContainer = styled.div`
  width: 370px;
  height: 38px;
  margin: 80px 115px 120px 115px;
  h1 {
    line-height: 40px;
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 30px;
    color: white;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: white;
  }
`;
const ImgInputBox = styled.div`
  margin: 0px 115px 123px 115px;
  img {
    width: 150px;
    margin-bottom: 40px;
  }
  p {
    margin-top: 8px;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: white;
  }
`;

const InputBox = styled.div`
  width: 350px;
  height: 240px;
  margin: 70px 115px 193px 115px;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin: 50px 0px 0px 255px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: #00c4b4;
  :disabled {
    border: none;
    color: #696b7b;
    background-color: #424453;
    :hover{
      background-color: #424453;
    }
  }
  :hover{
      background-color: #03DAC5;
    }
`;

const ContinueBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 20%;
  top: 83%;
  width: 145px;
  height: 42px;
  border-radius: 25px;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  color: white;
  background-color: #00c4b4;
  :disabled {
    border: none;
    color: #696b7b;
    background-color: #424453;
    :hover{
      background-color: #424453;
    }
  }
  :hover{
      background-color: #03DAC5;
    }
`;

const CloseBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 55%;
  top: 83%;
  width: 145px;
  height: 42px;
  border-radius: 30px;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  color: white;
  background-color: #424453;
  :disabled {
    border: none;
    background-color: gray;
  }
`;

export const StyleBoxLogin = styled.button`
  border: none;
  background-color: #2c2e39;
  padding: 5px 7.5px 5px 7.5px;
  margin-top: 5px;
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
    font-size: ${(props) => (props.native ? "12px" : "14px")};
    position: relative;
    top: 20%;
  }
  input[type="checkbox"] + label {
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    border: 2px solid #393a47;
    background-color: #393a47;
    color: white;
    cursor: pointer;
  }
  input[type="checkbox"]:checked + label {
    color: white;
    display: inline-block;
    width: 120px;
    height: 50px;
    border-radius: 15px;
    background-color: #00c4b4;
    border: 2px solid #00c4b4;
    cursor: pointer;
  }
`;
