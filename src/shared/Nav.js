import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "./cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory } from "react-router-dom";

// JS파일
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

const Nav = (props) => {
  const size = useWindowSize();
  const token = getCookie("token");
  const dispatch = useDispatch();
  const history = useHistory();
  // props.nav (false or true)
  const navState = props.nav;
  const setNavState = props.setNav;

  const wrapperRef = useRef();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  // NavBar 설정
  const [nav, setNav] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setNavState(false);
    } else {
      setNavState(true);
    }
  };
  // useEffect로 navState가 바뀔때마다 렌더링
  useEffect(() => {
    setNav(navState);
  }, [navState]);
  // SignOut
  const signOut = () => {
    setNav(false);
    deleteCookie("token");
    dispatch(userActions.logOutDB());
    sessionStorage.clear();
    window.location.replace("/");
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

  return (
    <React.Fragment>
      {num === 0 ? (
        <div ref={wrapperRef}>
          {nav ? (
            <NavBar>
              <Profile>
                <h1>{props.name ? props.name : "ㅡ"}</h1>
                <p>{props.email}</p>
              </Profile>
              <NavPro
                onClick={() => {
                  history.push("/mypage");
                }}
              >
                <img
                  style={{ marginRight: "15px" }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/mypage.svg"}
                />
                마이페이지
              </NavPro>
              <NavSet
                onClick={() => {
                  history.push(`/editinfo/changeinfo/${props.userId}`);
                }}
              >
                <img
                  style={{
                    marginRight: "15px",
                  }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/navpencil.svg"}
                />
                내 정보 수정
              </NavSet>
              <NavLog>
                <Logout
                  onClick={() => {
                    signOut();
                  }}
                >
                  로그아웃
                </Logout>
              </NavLog>
            </NavBar>
          ) : null}
        </div>
      ) : (
        <>
          {nav ? (
            <BigNavBar ref={wrapperRef}>
              <BigProfile>
                <Left>
                  <h1>{props.name}</h1>
                  <p>{props.email}</p>
                </Left>
                <Right>
                  <img
                    style={{ marginTop: "45px" }}
                    alt=""
                    src={process.env.PUBLIC_URL + "/img/fornav.svg"}
                  />
                </Right>
              </BigProfile>
              <NavPro
                style={{ justifyContent: "center" }}
                onClick={() => {
                  history.push("/mypage");
                }}
              >
                <img
                  style={{ marginRight: "15px" }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/mypage.svg"}
                />
                <div style={{ marginRight: "180px" }}>마이페이지</div>
              </NavPro>
              <NavSet
                onClick={() => {
                  history.push(`/editinfo/changeinfo/${props.userId}`);
                }}
              >
                <img
                  style={{
                    marginRight: "15px",
                  }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/navpencil.svg"}
                />
                <div style={{ marginRight: "178px" }}>내 정보 수정</div>
              </NavSet>
              <NavSet
                onClick={() => {
                  history.push(`/write/portfolio/introduce/${userInfo.porfId}`);
                }}
              >
                <img
                  style={{
                    marginRight: "15px",
                  }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/porf.svg"}
                />
                <div style={{ marginRight: "173px" }}>내 포트폴리오</div>
              </NavSet>
              <NavSet
                onClick={() => {
                  history.push("/write/project/info");
                }}
              >
                <img
                  style={{
                    marginRight: "15px",
                  }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/proj.svg"}
                />
                <div style={{ marginRight: "180px" }}>새 프로젝트</div>
              </NavSet>
              <NavLog>
                <Logout
                  onClick={() => {
                    signOut();
                  }}
                >
                  로그아웃
                </Logout>
              </NavLog>
            </BigNavBar>
          ) : null}
        </>
      )}
    </React.Fragment>
  );
};
// NavBar component
const NavBar = styled.nav`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 280px;
  top: 75px;
  margin-right: 30px;
  right: 0;
  background-color: #2c2e39;
`;
const BigNavBar = styled.nav`
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 5px;
  z-index: 15;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 350px;
  top: 75px;
  margin-right: 30px;
  right: 0;
  background-color: #2c2e39;
`;

const BigProfile = styled.div`
  display: flex;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #393a47;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;
const Left = styled.div`
  width: 65%;
  height: 100%;
  margin-left: 40px;
  h1 {
    margin-top: 35px;
    font-weight: 600;
    font-size: 26px;
    color: white;
  }
  p {
    margin-top: 15px;
    font-size: 14px;
    color: #cfd3e2;
  }
`;
const Right = styled.div`
  width: 35%;
  height: 100%;
`;
const Profile = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 120px;
  border-bottom: 1px solid #393a47;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  h1 {
    margin-top: 35px;
    font-weight: 600;
    font-size: 26px;
    color: white;
  }
  p {
    margin-top: 15px;
    font-size: 14px;
    color: #cfd3e2;
  }
`;
const NavPro = styled.div`
  border-top: none;
  border-bottom: none;
  color: #cfd3e2;
  width: 100%;
  height: 50px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    width: 90%;
    border-radius: 5px;
    background-color: #424453;
  }
`;

const NavSet = styled.div`
  border-bottom: none;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  text-align: center;
  margin: 10px auto;
  color: #cfd3e2;
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    width: 90%;
    border-radius: 5px;
    background-color: #424453;
  }
`;
const NavLog = styled.div`
  border-top: 1px solid #393a47;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 17px 0px 17px 0px;
  width: 100%;
  height: 40px;
  &:hover {
  }
`;
const Logout = styled.button`
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 150px;
  padding: 5px 20px;
  height: 40px;
  background: #424453;
  color: #ffffff;
  border: 1px solid #424453;
  box-sizing: border-box;
  border-radius: 30px;
  :hover {
    border: 1px solid #696b7b;
    color: white;
    background-color: #696b7b;
  }
`;
export default Nav;
