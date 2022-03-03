import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/loginModal/Modal";

const Header = (props) => {
  // const userName = localStorage?.getItem("userName")?.substring(0, 2)

  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <StyledHeader>
        <RightMenu>로고</RightMenu>
        <LeftMenu>
          <WriteBtn
            onClick={() => {
              modalClose();
            }}
          >
            로그인/회원가입
          </WriteBtn>
          {modalOpen && <Modal modalClose={modalClose}></Modal>}
        </LeftMenu>
      </StyledHeader>
    </>
  );
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

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  margin-left: 2px;
  font-size: 25px;
  font-weight: 500;
`;

const LeftMenu = styled.div`
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

