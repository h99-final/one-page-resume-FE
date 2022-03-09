import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MakeProject from "../components/makeproject/MakeProject";
import MakeTroubleShooting from "../components/makeproject/MakeTroubleShooting";
import Header from "../shared/Header";
import styled from 'styled-components';
import { FormTitle } from '../components/makeporf/shared/_sharedStyle';

function MyPage() {


  return (
    <>
      <Header />
      <Form>
        <UserInfoBox>
          <Title>기본 정보</Title>
          <UserInfo></UserInfo>
        </UserInfoBox>
        <PortfolioBox>
          <Title>포트폴리오</Title>
          <Portfolio></Portfolio>
        </PortfolioBox>
      </Form>
    </>
  );
}
export const Title = styled.div`
  width: 113px;
  height: 30px;
  left: 0px;
  margin-top: 60px;
  margin-bottom: 10px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 24px;
  color: #000000;
`;

const Form = styled.div`
  width: 96%;
  height: 40vh;
  min-width: 834px;
  min-height: 40vh;
  border: 1px solid;
  background: #ffffff;
  display: flex;
  @media screen and (min-width: 1194px) {
    & {
      width: 96%;
      margin: 0px auto;
    }
  }
  @media screen and (min-width: 834px) {
    & {
      margin: 0px auto;
    }
  }
`;

const UserInfoBox = styled.div`
  
  width: 68%;
  margin-right: 24px;
  position: relative;
  @media only screen and (max-width: 1300px) {
  }
`;
const PortfolioBox = styled.div`
  background-color: white;
  position: relative;
  min-width: 350px;
  width: 32%;
  @media only screen and (max-width: 1300px) {
  }
`;
const UserInfo = styled.div`
  background-color: #777777;
  width: 99%;
  height: 502px;
  border-radius: 10px;
  border: 1px solid blue;
  @media only screen and (max-width: 1300px) {
  }
`;
const Portfolio = styled.div`
  background-color: #777777;
  width: 99%;
  height: 502px;
  border-radius: 10px;
  border: 1px solid red;
  @media only screen and (max-width: 1300px) {
  }
`;


export default MyPage;
