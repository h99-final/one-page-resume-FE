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
import ExitModal from "./ExitModal";

const Modal = ({ modalClose }) => {
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin);
  console.log(isFirstLogin);
  const [modalOpen, setModalOpen] = useState(false);

  const exitClose = () => {
    setModalOpen(!modalOpen);
  };

  const loginClose = () => {
    setModalOpen(!modalOpen);
  };

  const dispatch = useDispatch();

  const [status, setStatus] = React.useState("aaa");

  const [email, setEmail] = React.useState();
  const [emailError, setEmailError] = useState("");

  return (
    <>
      <ModalBox>
        <WelcomeBox>
          <TextContainer>
            <h1>Portfolio</h1>

            <p>Portfolio와 함께 하면 할 수 있는 것들이에요!</p>

            <TextBox style={{ margin: "0px 33.5px 0px 33.5px" }}>
              내 프로젝트에 도움이 되는 다양한 영감을 얻어요!
            </TextBox>
            <TextBox style={{ margin: "15px 73px 0px 73px" }}>
              예쁜 포트폴리오를 빠르게 만들어요.
            </TextBox>
            <TextBox style={{ margin: "15px 0px" }}>
              내가 보여주고 싶은 GitHub코드만 골라서 보여줄 수 있어요.
            </TextBox>
          </TextContainer>
        </WelcomeBox>
        <UserBox>
          {isFirstLogin === false ? (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "2%",
                  right: "2%",
                }}
              >
                <button
                  style={{
                    float: "right",
                    backgroundColor: "inherit",
                    border: "none",
                  }}
                  onClick={() => {
                    modalClose();
                  }}
                >
                  ❌
                </button>
              </div>
              {status === "aaa" && (
                <Start status={setStatus} email={setEmail} />
              )}
              {status === true && (
                <Login
                  email={email}
                  isFirstLogin={isFirstLogin}
                  loginClose={modalClose}
                />
              )}
              {status === false && (
                <Signup email={email} loginClose={modalClose} />
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "2%",
                  right: "2%",
                }}
              >
                <button
                  style={{
                    float: "right",
                    backgroundColor: "inherit",
                    border: "none",
                  }}
                  onClick={() => {
                    exitClose();
                  }}
                >
                  ❌
                </button>
              </div>
              {isFirstLogin === true && (
                <AddInfo loginClose={modalClose} isFirstLogin={isFirstLogin} />
              )}
            </>
          )}
        </UserBox>

        {modalOpen && <ExitModal exitClose={exitClose}></ExitModal>}
      </ModalBox>
    </>
  );
};

export default Modal;

const ModalBox = styled.div`
  text-align: center;
  border-radius: 10px;
  display: flex;
  width: 1160px;
  height: 800px;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;

  @media only screen and (max-width: 1300px) {
    width: 580px;
    height: 800px;
  }
`;

const WelcomeBox = styled.div`
  background-color: #777777;
  width: 50%;
  position: relative;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  @media only screen and (max-width: 1300px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  width: 408px;
  height: 323px;
  margin: 240px 85px 240px 85px;
  h1 {
    font-size: 48px;
    font-weight: bold;
  }
  p {
    margin-top: 34px;
    margin-bottom: 60px;
    font-size: 16px;
    font-weight: normal;
  }
`;

const TextBox = styled.div`
  background-color: white;
  border-radius: 15px;
  align-items: center;
  text-align: center;
  width: auto;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: normal;
`;

const UserBox = styled.div`
  background-color: white;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;

  position: relative;
  min-height: 500px;
  min-width: 350px;
  width: 50%;
  @media only screen and (max-width: 1300px) {
    width: 100%;
    border-radius: 10px;
  }
`;
