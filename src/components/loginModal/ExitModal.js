import React from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import { TextField } from "@mui/material";
import { emailCheck } from "../../shared/common";
import { useSelector } from "react-redux";
import { actionCreators as userActions } from "../../redux/modules/user";
import { useDispatch } from "react-redux";
import AddInfo from "./AddInfo";
import Start from "./Start";

const ExitModal = ({ exitClose }) => {
  const userInfo = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("aaa");

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState("");

  return (
    <ModalBG>
      <ModalBox>
        <TextContainer>
          <h1>정말 나가시겠어요?</h1>
          <p>지금 나가면 정보가 저장되지 않아요. 그래도 나가시겠습니까?</p>
        </TextContainer>
        <BtnBox>
          <span>
            <Btn
              onClick={() => {
                window.location.replace("/");
              }}
            >
              다음에 하기
            </Btn>
          </span>
          <Btn2
            onClick={() => {
              exitClose(false);
            }}
          >
            계속하기
          </Btn2>
        </BtnBox>
      </ModalBox>
    </ModalBG>
  );
};

export default ExitModal;

const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;
const ModalBox = styled.div`
  border-radius: 10px;
  width: 678px;
  height: 280px;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #2c2e39;
  color: white;
`;
const BtnBox = styled.div`
  width: 50%;
  margin: 0px auto;
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
`
const Btn = styled.button`
  cursor: pointer;
  width: 140px;
  height: 42px;
  border-radius: 30px;
  font-size: 14px;
  padding: 10px 20px;
  border: none;
  color: white;
  background-color: #424453;
`;
const Btn2 = styled.button`
  cursor: pointer;
  width: 140px;
  height: 42px;
  border-radius: 25px;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  color: white;
  background-color: #00c4b4;
`;

const TextContainer = styled.div`
  width: 408px;
  height: 100px;
  margin: 70px 135px 0px 135px;
  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 35px;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: #cfd3e2;
    line-height: 24px;
    font-weight: 400;
  }
`;
