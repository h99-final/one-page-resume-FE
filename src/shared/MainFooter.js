import React, { useState } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import styled from "styled-components";

const MainFooter = () => {
  const history = useHistory();
  return (
    <>
      <StyledHeader>
        <LeftMenu>
          <Port onClick={() => {
            window.open('https://useful-jonquil-43d.notion.site/POUG-0111568c60b74c679782702fb8686653', '_blank')
          }}>
            포그팀 소개
          </Port>
          <Port onClick={() => {
            history.push('/policy')
          }}>
            운영정책
          </Port>
          <Port onClick={() => {
            history.push('/privacy')
          }}>
            개인정보처리방침
          </Port>
          <Port onClick={() => {
            window.open('https://forms.gle/1wwX7GwG92QaSQcp7', '_blank')
          }}>
            버그제보
          </Port>
        </LeftMenu>
        <RightMenu>

          <Port>
            인스타그램
          </Port>

          <Proj>

            <img
              alt=""
              src={process.env.PUBLIC_URL + "/img/footLogo.svg"}
            />
          </Proj>
        </RightMenu>
      </StyledHeader>
    </>
  );

};

export default MainFooter;

export const StyledHeader = styled.div`
  border-top: 1px solid #2C2E39;
  background-color: #1F2029;
  height: 35px;
  display: flex;
  position: fixed;
  bottom: 0px;
  width: 100%;
  min-width: 800px;
  align-items: center;
  justify-content: space-between;
  z-index: 4;
`;

export const LeftMenu = styled.div`
  margin-left: 20px;
  display: flex;
  color: #9C9EAE;
  align-items: center;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  a {
      text-decoration: none;
  }
`;

const Port = styled.div`
  width: fit-content;
  cursor: pointer;
  margin-right: 30px;
  &:hover {
    color: #00c4b4;
    transition: 0.5s ease-in-out;
  }
`;

const Proj = styled.div`
  font-size: 20px;
  width: fit-content;
  cursor: pointer;
  &:hover {
    color: #00c4b4;
    transition: 0.5s ease-in-out;
  }
`;

export const RightMenu = styled.div`
margin-right: 20px;
display: flex;
color: #9C9EAE;
align-items: center;
font-style: normal;
font-weight: 400;
font-size: 14px;
line-height: 17px;
`;