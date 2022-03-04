import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deleteCookie } from './cookie';
// JS파일

const Nav = (props) => {

  const user = document.cookie

  // props.nav (false or true)
  const navState = props.nav

  // NavBar 설정
  const [nav, setNav] = useState(false)

  // useEffect로 navState가 바뀔때마다 렌더링
  useEffect(() => {
    setNav(navState)
  }, [navState])

  // SignOut
  const signOut = () => {
    setNav(false)
    deleteCookie(user)
    window.location.reload()
  }

  return (
    <React.Fragment>
      {nav
        ?
        <NavBar >
          <Profile>
            <name>김철수</name>
            <email>aaa@example.com</email>
          </Profile>
          <NavPro >
            프로필
          </NavPro>
          <NavSet onClick={() => { alert("@") }}>
            설정
          </NavSet>
          <NavLog>

          </NavLog>
        </NavBar>
        : null
      }
    </React.Fragment>
  )
}

// NavBar component
const NavBar = styled.nav`

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    position:absolute;
    width: auto;
    top: 75px;
    margin-right: 30px;
    right:0;

`
// NavList component
const Profile = styled.div`
    flex-direction: column;
    justify-content : center;
    align-items: center;
    text-align: center;
    background-color: white;
    width: 160px;
    height: 60px;
    border: 1px solid #999999;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    padding: 28px 60px 29px 60px;
    
    name{
    font-weight: 600;
    font-size: 26px;
    }
    email{
      font-size: 14px;
      color: #5f5f5f;
    }

`;
const NavPro = styled.div`
    border: 1px solid #999999;
    border-top: none;
    border-bottom:none;
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
    cursor:pointer;
    &:hover {
      background-color: #999999;
    };
`

const NavSet = styled.div`
    border: 1px solid #999999;
    border-bottom:none;
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
    cursor:pointer;
    &:hover {
      background-color: #999999;
    };
`
const NavLog = styled.div`
border: 1px solid #999999;
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
flex-direction: column;
justify-content: center;
align-items: center;
background-color: white;
width:280px;
height: 74px;
cursor:pointer;

&:hover {
};
`
export default Nav