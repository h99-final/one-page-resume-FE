import React from "react";
import styled from "styled-components";
import { apis } from "../../shared/axios";
import { useState } from "react";
import { TextField } from "@mui/material";
import { emailCheck } from "../../shared/common";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { KAKAO_AUTH_URL } from '../../shared/kakaoAuth';

const theme = createTheme({
  palette: {
    error: orange,
  },
});

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focuscolor"
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focuscolor
  },
  // focused color for input with variant='standard'
  "& .MuiInput-underline:after": {
    borderBottomColor: p.focuscolor
  },
  // focused color for input with variant='filled'
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: p.focuscolor
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focuscolor
    }
  },
  '& .MuiInputBase-input': {
    position: 'relative',
    color: "white",
    width: '100%',
    borderBottom: '1px solid white',
  },
  "& input: internal+autofill+selected": {
    backgroundImage: "none",
    backgroundColor: "black",
    color: "none",
  },
  '& input:valid + fieldset': {
  },
  '& input:invalid + fieldset': {
  },
  '& input:valid:focus + fieldset': { // override inline-style
  },
}));

const Start = (props) => {
  const history = useHistory();

  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const statusFunction = props.status;
  const emailFunction = props.email;

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState("");
  const [sign, setSign] = useState(false);

  const inputEmail = (e) => {
    setEmail(e.target.value);
  };

  const sumitEmail = () => {
    if (!emailCheck(email) || !email) {
      setEmailError("이메일 형식을 다시 확인해주세요!");
      setSign(false)
      return;
    }

    // statusFunction(true)

    apis.dupCheck(email).then((res) => {
      emailFunction(email);
      if (res.data.result === true) {
        return statusFunction(true);
      }
      else {
        setSign(true)
        setEmailError("등록되지 않은 이메일입니다.")
      }
    });
  };

  return (
    <>
      <TextContainer>
        <h1>시작하기</h1>
        <p>포그가 처음이신가요? <span onClick={() => { statusFunction(false) }}>간편 가입하기</span></p>
      </TextContainer>
      <ThemeProvider theme={theme}>
        <InputBox>
          <CssTextField
            focuscolor="#00C4B4"
            onChange={inputEmail}
            variant="standard"
            required
            fullWidth
            type="email"
            id="email"
            name="email"
            placeholder="이메일 주소"
            error={emailError !== "" || false}
          />
          {emailError && (
            <div style={{ textAlign: "left" }}>
              {!sign ? <span style={{ fontSize: "14px", color: "orange" }}>{emailError}</span>
                : <span style={{ fontSize: "14px", color: "orange" }}>{emailError}
                  <span
                    style={{
                      cursor: "pointer",
                      marginLeft: "5px",
                      fontStyle: "normal",
                      fontWeight: "700",
                      lineHeight: "17px",
                      fontSize: "14px",
                      color: "#CFD3E2",
                    }}
                    onClick={() => { statusFunction(false) }}>간편 가입하기</span>
                </span>
              }
            </div>
          )}

          <WriteBtn
            disabled={!email || !email ? true : false}
            onClick={sumitEmail}
          >
            계속하기
          </WriteBtn>
        </InputBox>
      </ThemeProvider>
      <OrBox>
        <Line />
        <Or>또는</Or>
        <img
          style={{ marginTop: "50px", cursor: "pointer" }}
          onClick={() => {
            window.location.href = `${KAKAO_AUTH_URL}`;
          }}
          alt="" src={process.env.PUBLIC_URL + "/img/kakaologin.svg"} />
      </OrBox>
    </>
  );
};

export default Start;

const TextContainer = styled.div`
  width: 350px;
  height: 102px;
  margin: 80px 115px 130px 115px;
  h1 {
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    color: #FFFFFF;
  }
  p {
    text-align: left;
    margin-top: 34px;
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: normal;
    color: #CFD3E2CC;
  }
  span{
    cursor: pointer;
    margin-left: 5px;
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #CFD3E2;
  }
`;

const InputBox = styled.div`
  width: 350px;
  height: 97px;
  margin: 0px 115px 193px 115px;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  width: 100px;
  height: 40px;
  border-radius: 30px;
  border: none;
  font-size: 14px;
  margin: 25px 0px 0px 254px;
  padding: 5px 10px 5px 10px;
  color: white;
  background-color: #00C4B4;
  :disabled {
    border: none;
    background-color: #424453;
  }
`;
const OrBox = styled.div`
  border: 1px solid #2C2E39;
  width: 350px;
  height: 118px;
  margin: 0px auto;
  text-align: center;
  /* border: 1px solid #2C2E39; */
`;

const Line = styled.div`
  position: absolute;
  border-top: 1px solid;
  color: #696B7B;
  width: 350px;
  z-index: 0;
  margin-top: 14px;
`;

const Or = styled.div`
  border: 1px solid #2C2E39;
  background-color: #2C2E39;
  position: absolute;
  width: 45px;
  z-index: 1;
  height: 17px;
  margin: 0px 152px;
  font-size: 14px;
  color: #999999;
  padding: 8px 0px 10px 0px;
`;
