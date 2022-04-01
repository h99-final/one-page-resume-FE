import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Login from "./Login";
import Signup from "./Signup";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import AddInfo from "./AddInfo";
import Start from "./Start";
import ExitModal from "./ExitModal";

const Modal = ({ modalClose }) => {
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin);
  const [modalOpen, setModalOpen] = useState(false);

  const exitClose = () => {
    setModalOpen(!modalOpen);
  };

  const [status, setStatus] = React.useState("aaa");

  const [email, setEmail] = React.useState();

  const wrapperRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };
  return (
    <>
      <ModalBG>
        <ModalBox ref={wrapperRef}>
          <WelcomeBox>
            <TextContainer>
              <h1>
                <img
                  style={{ width: "200px" }}
                  alt=""
                  src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/POUG.gif"
                />
              </h1>

              <p>POUG와 함께 하면 할 수 있는 것들이에요!</p>

              <TextBox style={{ color: "#FF9B00" }}>
                내 프로젝트에 도움이 되는 다양한 영감을 얻어요!
              </TextBox>
              <TextBox style={{ color: "#8EEE4E" }}>
                예쁜 포트폴리오를 빠르게 만들어요.
              </TextBox>
              <TextBox style={{ color: "#E498FF" }}>
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
                    top: "20px",
                    right: "20px",
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
                    <img
                      alt=""
                      src={process.env.PUBLIC_URL + "/img/close.svg"}
                    />
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
                  <Signup newEmail={email} loginClose={modalClose} />
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
                    <img
                      alt=""
                      src={process.env.PUBLIC_URL + "/img/close.svg"}
                    />
                  </button>
                </div>
                {isFirstLogin === true && (
                  <AddInfo
                    loginClose={modalClose}
                    isFirstLogin={isFirstLogin}
                  />
                )}
              </>
            )}
          </UserBox>
        </ModalBox>
      </ModalBG>

      {modalOpen && <ExitModal exitClose={exitClose}></ExitModal>}
    </>
  );
};

export default Modal;

const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
`;

const ModalBox = styled.div`
  text-align: center;
  border-radius: 10px;
  display: flex;
  width: 1160px;
  height: 800px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media only screen and (max-width: 1300px) {
    width: 580px;
    height: 800px;
  }
`;

const WelcomeBox = styled.div`
  background: url("https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/welcome.png");
  width: 50%;
  position: relative;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  @media only screen and (max-width: 1300px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  width: 450px;
  height: 323px;
  margin: 210px auto;
  h1 {
    font-size: 48px;
    font-weight: bold;
  }
  p {
    margin-top: 95px;
    margin-bottom: 25px;
    font-size: 16px;
    font-weight: normal;
    color: #ffffff;
  }
`;

const TextBox = styled.div`
  margin: 15px auto;
  background-color: rgba(66, 68, 83, 0.7);
  border-radius: 15px;
  align-items: center;
  text-align: center;
  width: fit-content;
  padding: 10px 10px;
  font-size: 15px;
  font-weight: normal;
`;

const UserBox = styled.div`
  background-color: #2c2e39;
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
