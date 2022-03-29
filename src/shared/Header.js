import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/loginModal/Modal";
import { Avatar } from "@mui/material";
import Nav from "./Nav";
import Pnav from "./Pnav";
import { useEffect } from "react";
import { apis } from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory, useLocation } from "react-router-dom";
import { debounce } from "../shared/common";

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const Header = (props) => {
  const size = useWindowSize();
  const location = useLocation();
  const [nav, setNav] = React.useState(false);
  const [pnav, setPnav] = React.useState(false);

  // const userInfo = useSelector((state) => state.user.user);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const isFirstLogin = useSelector((state) => state.user.isFirstLogin);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (isFirstLogin) {
      setModalOpen(true);
    }
  }, []);

  const navBtn = () => {
    if (nav) {
      setNav(false);
    } else {
      setNav(true);
      setPnav(false);
    }
  };

  const PnavBtn = () => {
    if (pnav) {
      setPnav(false);
    } else {
      setPnav(true);
      setNav(false);
    }
  };

  const toLogin = () => {
    window.alert("내 포트폴리오를 보려면 로그인이 필요합니다.");
    setModalOpen(true);
  };

  const [num, setNum] = useState(0);

  useEffect(() => {
    if (size.width <= 971) {
      setNum(1);
    }
    if (size.width > 971) {
      setNum(0);
    }
  }, [size.width]);

  if (!userInfo) {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <img
              onClick={() => {
                history.push(`/`);
              }}
              style={{ marginRight: "5px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoBefore.svg"}
            />
            <img
              onClick={toLogin}
              style={{ marginRight: "5px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoAfter.svg"}
            />
            <Port
              selected={location.pathname === "/portfolio" ? true : false}
              onClick={() => {
                history.push("/portfolio");
              }}
            >
              포트폴리오
            </Port>
            <Proj
              selected={location.pathname === "/project" ? true : false}
              onClick={() => {
                history.push("/project");
              }}
            >
              프로젝트
            </Proj>
          </LeftMenu>
          <RightMenu>
            <WriteBtn
              onClick={() => {
                modalClose();
              }}
            >
              로그인/회원가입
            </WriteBtn>
            {modalOpen && <Modal modalClose={modalClose}></Modal>}
          </RightMenu>
        </StyledHeader>
      </>
    );
  } else {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <img
              onClick={() => {
                history.push(`/`);
              }}
              style={{ marginRight: "5px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoBefore.svg"}
            />
            <img
              onClick={() => {
                history.push(`/portfolio/${userInfo.porfId}`);
              }}
              style={{ marginRight: "5px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoAfter.svg"}
            />
            <Port
              selected={location.pathname === "/portfolio" ? true : false}
              onClick={() => {
                history.push("/portfolio");
              }}
            >
              포트폴리오
            </Port>
            <Proj
              selected={location.pathname === "/project" ? true : false}
              onClick={() => {
                history.push("/project");
              }}
            >
              프로젝트
            </Proj>
            <Pnav pnav={pnav} />
          </LeftMenu>
          <RightMenu>
            {num === 1 ? (
              <></>
            ) : (
              <>
                <SharedBtn
                  onClick={() => {
                    PnavBtn();
                  }}
                >
                  작업 작성하기
                </SharedBtn>
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/BookmarkGrey.svg"}
                  style={{
                    width: "26px",
                    height: "26px",
                    color: "#333333",
                    marginRight: "12px",
                  }}
                />
                <img
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/BellGrey.svg"}
                  style={{
                    width: "26px",
                    height: "26px",
                    color: "#333333",
                    marginRight: "15px",
                  }}
                />
              </>
            )}

            <Avatar
              onClick={() => {
                navBtn();
              }}
              alt={userInfo?.name}
              src={userInfo?.profileImage}
              sx={{ width: 38, height: 38 }}
            />
            <Nav
              nav={nav}
              name={userInfo?.name}
              email={userInfo?.email}
              userId={userInfo?.userId}
            />
            {modalOpen && <Modal modalClose={modalClose}></Modal>}
          </RightMenu>
        </StyledHeader>
      </>
    );
  }
};

export default Header;

export const StyledHeader = styled.div`
  background-color: #13131b;
  display: flex;
  position: fixed;
  top: 0px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  z-index: 5;
`;

export const LeftMenu = styled.div`
  margin-left: 30px;
  display: flex;
  color: white;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
  cursor: pointer;
`;

const Port = styled.div`
  font-size: 20px;
  width: fit-content;
  margin-left: 50px;
  cursor: pointer;
  &:hover {
    color: #00c4b4;
    transition: 0.5s ease-in-out;
  }
  color: ${(props) => (props.selected ? "#00c4b4" : "")};
`;

const Proj = styled.div`
  font-size: 20px;
  width: fit-content;
  margin-left: 40px;
  cursor: pointer;
  &:hover {
    color: #00c4b4;
    transition: 0.5s ease-in-out;
  }
  color: ${(props) => (props.selected ? "#00c4b4" : "")};
`;

export const RightMenu = styled.div`
  display: flex;
  margin-right: 30px;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
`;

const SharedBtn = styled.button`
  cursor: pointer;
  background-color: #00b3a6;
  width: fit-content;
  height: 40px;
  color: white;
  border-radius: 24px;
  font-size: 17px;
  padding: 10px 20px;
  border: none;
  margin-right: 30px;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  background-color: #00c4b4;
  width: fit-content;
  height: 40px;
  color: white;
  border-radius: 25px;
  font-size: 17px;
  padding: 10px 20px;
  border: none;
`;
