import React from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import { apis } from "../../shared/axios";
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
  console.log(userInfo);

  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("aaa");

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState("");

  console.log(email);

  return (
    <>
      <ModalBox>
        <TextContainer>
          <h1>정말 나가시겠어요?</h1>
          <p>추가정보가 완전히 입력되지 않았어요.</p>
          <p>지금 나가면 정보가 저장되지 않아요. 그래도 나가시겠습니까?</p>
        </TextContainer>
        <div>
          <span>
            <Btn
              onClick={() => {
                window.location.replace("/");
              }}
            >
              다음에 할게요
            </Btn>
          </span>
          <Btn2
            onClick={() => {
              exitClose(false);
            }}
          >
            입력할게요
          </Btn2>
        </div>
        {/* <Btn onClick={() => { window.location.reload('/') }}>다음에 할게요</Btn>
        <Btn onClick={() => { exitClose(false) }}>입력할게요</Btn> */}
      </ModalBox>
    </>
  );
};

export default ExitModal;

const ModalBox = styled.div`
  border-radius: 10px;
  display: flex;
  width: 678px;
  height: 280px;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #333333;
  color: white;
`;

const Btn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 52%;
  top: 70%;
  width: 140px;
  height: 42px;
  border-radius: 30px;
  font-size: 14px;
  padding: 12.5px 20px;
  border: none;
  color: white;
  background-color: #555555;
`;
const Btn2 = styled.button`
  cursor: pointer;
  position: absolute;
  right: 23%;
  top: 70%;
  width: 140px;
  height: 42px;
  border-radius: 25px;
  font-size: 14px;
  padding: 12.5px 20px;
  border-radius: 30px;
  border: none;
  color: white;
  background-color: #999999;
`;
const UserBox = styled.div`
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 22vh;
`;

const TextContainer = styled.div`
  width: 408px;
  height: 126px;
  margin: 40px 135px 0px 135px;
  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 30px;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
`;
