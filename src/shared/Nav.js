import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCookie, getCookie } from "./cookie";
// JS파일

const Nav = (props) => {
  const token = document.cookie;

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
    deleteCookie(token);
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
          <NavPro>프로필</NavPro>
          <NavSet
            onClick={() => {
              alert("@");
            }}
          >
            설정
          </NavSet>
          <NavLog>
            <Logout onClick={signOut}>로그아웃</Logout>
          </NavLog>
        </NavBar>
      ) : null}
    </React.Fragment>
  );
};
// NavBar component
const NavBar = styled.nav`
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: auto;
  top: 75px;
  margin-right: 30px;
  right: 0;
`;
// NavList component
const Profile = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  width: 160px;
  height: 70px;
  border: 1px solid #999999;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 25px 60px 7px 60px;

  h1 {
    font-weight: 600;
    font-size: 26px;
  }
  p {
    margin-top: 15px;
    font-size: 14px;
    color: #5f5f5f;
  }
`;
const NavPro = styled.div`
  border: 1px solid #999999;
  border-top: none;
  border-bottom: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  width: 40px;
  height: 18px;
  padding: 16px 120px 16px 120px;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    background-color: #999999;
  }
`;

const NavSet = styled.div`
  border: 1px solid #999999;
  border-bottom: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  width: 40px;
  height: 18px;
  padding: 16px 120px 16px 120px;
  font-size: 14px;
  font-weight: normal;
  cursor: pointer;
  &:hover {
    background-color: #999999;
  }
`;
const NavLog = styled.div`
  border: 1px solid #999999;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  padding: 17px 96px 17px 96px;
  background-color: white;
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
  /* C6 */
  background: #ffffff;
  /* C4 */
  color: #999999;
  border: 1px solid #999999;
  box-sizing: border-box;
  border-radius: 30px;
  :hover {
    color: white;
    background-color: #999999;
  }
`;
export default Nav;
