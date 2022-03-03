import { Token } from '@mui/icons-material';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import Modal from "../components/loginModal/Modal";
import { deleteCookie } from './cookie';
import { Avatar } from '@mui/material';
const Header = (props) => {
  const history = useHistory();
  // const userName = localStorage?.getItem("userName")?.substring(0, 2)

  const user = document.cookie
  console.log(user)
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
  const logout = () => {
    deleteCookie(user)
    window.location.reload()
  }

  if (!user) {
    return (
      <>
        <StyledHeader>
          <LeftMenu>로고</LeftMenu>
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
          <LeftMenu>로고</LeftMenu>
          <RightMenu>
            <Avatar
              onClick={() => { logout() }}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            {modalOpen && <Modal modalClose={modalClose}></Modal>}
          </RightMenu>
        </StyledHeader>
      </>
    );
  }

};

export default Header;

const StyledHeader = styled.div`
  background-color: #999999;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  height: 64px;
  margin-left: auto;
  margin-right: auto;
`;

const LeftMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin-left: 2px;
  font-size: 25px;
  font-weight: 500;
`;

const RightMenu = styled.div`
  background-color: inherit;
  border: none;
  font-size: 16px;
  font-weight: 500;
`;
const WriteBtn = styled.button`
  cursor: pointer;
  border-radius: 25px;
  margin: 15px 0px px 5px;
  font-size: 17px;
  padding: 10px 10px;
  border: 1px solid black;
  border-radius: 25px;

`;

