import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MakeProject from "../components/makeproject/MakeProject";
import MakeTroubleShooting from "../components/makeproject/MakeTroubleShooting";
import Header from "../shared/Header";
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { EditSharp } from '@mui/icons-material';

function MyPage() {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  return (
    <>
      <Header />
      <Form>
        <UserInfoBox>
          <Title>기본 정보</Title>
          <UserInfo>
            <LeftBox>
              <Avatar
                style={{ marginBottom: "50px" }}
                alt="사진을 등록해주세요"
                src={userInfo.profileImage ? userInfo.profileImage : null}
                sx={{ width: "250px", height: "250px" }}
              />
              <EditButton><EditSharp style={{ marginRight: "10px" }} />내 정보 수정</EditButton>
            </LeftBox>
            <RightBox>
              <NnE><h1>{userInfo.name ? userInfo.name : "ㅡ"}</h1></NnE>
              <NnE><p>{userInfo.email}</p></NnE>
              <Content >
                <Label >
                  <Font>대표 스택</Font>
                </Label>
                {userInfo.name ?
                  <>
                    <Stack>{userInfo?.stack[0]}</Stack>
                    <Stack>{userInfo?.stack[1]}</Stack>
                    <Stack>{userInfo?.stack[2]}</Stack>
                  </>
                  :
                  <Font>ㅡ</Font>
                }

              </Content>
              <Content >
                <Label >
                  <Font>전화번호</Font>
                </Label>
                <Font>{userInfo.phoneNum ? userInfo.phoneNum : "ㅡ"}</Font>
              </Content>
              <Content >
                <Label >
                  <Font>GitHub URL</Font>
                </Label>
                <Font>{userInfo.gitUrl ? userInfo.gitUrl : "ㅡ"}</Font>
              </Content>
              <Content >
                <Label >
                  <Font>Blog URL</Font>
                </Label>
                <Font>{userInfo.blogUrl ? userInfo.blogUrl : "ㅡ"}</Font>
              </Content>
              <Content >
                <Label >
                  <Font>직무</Font>
                </Label>
                <Font>{userInfo.job ? userInfo.job : "ㅡ"}</Font>
              </Content>
            </RightBox>
          </UserInfo>
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
export const Font = styled.div`
  /* body1 */
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #333333;
`;
export const Stack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: #333333;
  border: 1px solid #999999;
  box-sizing: border-box;
  border-radius: 30px;
  margin-right: 10px;
  padding: 10px 0px;
  width: 90px;
  height: 40px;
`;
export const Label = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 150px;
  height: 44px;
  left: 0px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 0px 13px 0px;
  vertical-align: middle;
`;
const Form = styled.div`
  width: 96%;
  height: 40vh;
  min-width: 834px;
  min-height: 40vh;
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
const NnE = styled.div`
  text-align: center;
  min-width: 350px;
  h1{
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    margin-bottom: 20px;
  }
  p{
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    margin-bottom: 20px;
    color: #555555;
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
  background-color: #EDEDED;
  width: 99%;
  min-width: 900px;
  height: 502px;
  border-radius: 10px;
  display: flex;
  @media only screen and (max-width: 1300px) {
  }
`;
const EditButton = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: white;
  background-color: #333333;
  border-radius: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  width: 249px;
  height: 60px;
`;
const LeftBox = styled.div`
  margin: 70px;
  width: 250px;
  margin-right: 24px;
  position: relative;
  @media only screen and (max-width: 1300px) {
  }
`;

const RightBox = styled.div`
  margin: 70px 30px 50px 70px;
  position: relative;
  min-width: 450px;
  width: 68%;
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
