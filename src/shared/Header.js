import { Token } from '@mui/icons-material';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import Modal from "../components/loginModal/Modal";
import { deleteCookie } from './cookie';
import { Avatar } from '@mui/material';
import Nav from './Nav';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';

const Header = (props) => {
  const history = useHistory();
  // const userName = localStorage?.getItem("userName")?.substring(0, 2)

  const [nav, setNav] = React.useState(false)
  const user = document.cookie
  console.log(user)
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };


  const navBtn = () => {
    if (nav) {
      setNav(false)
    } else {
      setNav(true)
    }
  }

  if (user) {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <Circle />
            Portfolio
            <Port>포트폴리오</Port>
            <Proj>프로젝트</Proj>
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
  }
  else {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <Circle />
            Portfolio
            <Port>포트폴리오</Port>
            <Proj>프로젝트</Proj>
          </LeftMenu>
          <RightMenu>
            <SharedBtn>작업 공유하기</SharedBtn>
            <BookmarkIcon
              style={{
                width: "26px", height: "26px",
                color: "#333333",
                marginRight: "12px"
              }}
            />
            <NotificationsIcon
              style={{
                width: "26px", height: "26px",
                color: "#333333",
                marginRight: "15px"
              }}
            />
            <Avatar

              onClick={() => { navBtn() }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 38, height: 38 }}
            />
            <Nav nav={nav} />
            {modalOpen && <Modal modalClose={modalClose}></Modal>}
          </RightMenu>
        </StyledHeader>
      </>
    );
  }

};

export default Header;

const StyledHeader = styled.div`
  background-color: #828282;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
`;

const LeftMenu = styled.div`
  
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
`;

const Circle = styled.div`
  background-color: #c4c4c4;
  font-size: 25px;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  margin-right: 10px;
`;
const Port = styled.div`
  
  font-size: 20px;
  width: 90px;
  height: 24px;
  margin-left: 50px;
`;
const Proj = styled.div`
  font-size: 20px;
  width: 70px;
  height: 24px;
  margin-left: 40px;
`;



const RightMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
`;

const SharedBtn = styled.button`

  cursor: pointer;
  background-color: #333333;
  width: 120px;
  height: 40px;
  color: white;
  border-radius: 24px;
  font-size: 17px;
  padding: 5px 10px 5px 10px;
  border: none;
  margin-right: 30px;
`;



const WriteBtn = styled.button`
  cursor: pointer;
  background-color: black;
  width: 130px;
  height: 40px;
  color: white;
  border-radius: 25px;
  font-size: 17px;
  padding: 5px 10px 5px 10px;
  border: none;
`;

