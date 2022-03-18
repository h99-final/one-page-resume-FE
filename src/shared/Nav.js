import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "./cookie";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory } from 'react-router-dom';

// JS파일

const Nav = (props) => {
  const token = document.cookie;
  const dispatch = useDispatch();
  const history = useHistory();
  // props.nav (false or true)
  const navState = props.nav;

  // NavBar 설정
  const [nav, setNav] = useState(false);

  // useEffect로 navState가 바뀔때마다 렌더링
  useEffect(() => {
    setNav(navState);
  }, [navState]);

  // SignOut
  const signOut = () => {
    setNav(false);
    console.log(getCookie("token"));
    deleteCookie("token");
    dispatch(userActions.logOutDB());
    console.log(getCookie("token"));
    window.location.reload("/");
  };

  return (
    <React.Fragment>
      {nav ? (
        <NavBar>
          <Profile>
            <h1>{props.name}</h1>
            <p>{props.email}</p>
          </Profile>
          <NavPro onClick={() => { history.push('/mypage') }}>
            <img
              style={{ marginRight: "15px" }}
              alt="" src={process.env.PUBLIC_URL + "/img/mypage.svg"} />
            마이페이지
          </NavPro>
          <NavSet
            onClick={() => {
              history.push(`/editinfo/changeinfo/${props.userId}`)
            }}
          >
            <img
              style={{
                marginLeft: "4px",
                marginRight: "15px"
              }}
              alt="" src={process.env.PUBLIC_URL + "/img/navpencil.svg"} />
            내 정보 수정
          </NavSet>
          <NavLog>
            <Logout onClick={() => { signOut() }}>로그아웃</Logout>
          </NavLog>
        </NavBar>
      ) : null}
    </React.Fragment>
  );
};
// NavBar component
const NavBar = styled.nav`
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: auto;
  top: 75px;
  margin-right: 30px;
  right: 0;
  background-color: #2C2E39;
  border-radius: 5px;
`;
// NavList component
const Profile = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 160px;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 25px 60px 7px 60px;

  h1 {
    font-weight: 600;
    font-size: 26px;
    color: white;
  }
  p {
    margin-top: 15px;
    font-size: 14px;
    color: #696B7B;
  }
`;
const NavPro = styled.div`
  border-top: none;
  border-bottom: none;
  color: #CFD3E2;
  width: 100px;
  height: 50px;
  padding: 5px 90px;
  font-size: 14px;
  font-weight: normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #999999;
  }
`;

const NavSet = styled.div`
  border-bottom: none;
  display: flex;
  align-items: center;
  text-align: center;
  color: #CFD3E2;
  width: 112px;
  height: 50px;
  padding: 5px 84px;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    background-color: #999999;
  }
`;
const NavLog = styled.div`
  border-top: 1px solid #999999;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 17px 96px 17px 96px;
  width: 88px;
  height: 40px;
  cursor: pointer;
  &:hover {
  }
`;
const Logout = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 40px;
  background: #393A47;
  color: #ffffff;
  border: 1px solid #393A47;
  box-sizing: border-box;
  border-radius: 30px;
  :hover {
    color: white;
    background-color: #999999;
  }
`;
export default Nav;
