import React from "react";
import { apis } from '../shared/axios';
import Header from "../shared/Header";
import styled from 'styled-components';
import { Avatar } from '@mui/material';
import { EditSharp } from '@mui/icons-material';
import { Add } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

function MyPage() {
  const history = useHistory();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const [title, setTitle] = useState("");

  useEffect(() => {
    apis.introPorfGet(userInfo.porfId)
      .then((res) => {
        setTitle(res.data.data.title)
      });
  }, []);

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
              <EditButton onClick={() => {
                history.push(`/editinfo/changeinfo/${userInfo.userId}`)
              }}><EditSharp style={{ marginRight: "10px" }} />내 정보 수정</EditButton>
            </LeftBox>
            <RightBox>
              <NnE>
                <h1>{userInfo.name ? userInfo.name : "ㅡ"}</h1>
              </NnE>
              <NnE>
                <p>{userInfo.email}</p>
              </NnE>
              <Content>
                <Label>
                  <Font>대표 스택</Font>
                </Label>
                {userInfo.name ? (
                  <>
                    <Stack>{userInfo?.stack[0]}</Stack>
                    <Stack>{userInfo?.stack[1]}</Stack>
                    <Stack>{userInfo?.stack[2]}</Stack>
                  </>
                ) : (
                  <Font>ㅡ</Font>
                )}
              </Content>
              <Content>
                <Label>
                  <Font>전화번호</Font>
                </Label>
                <Font>{userInfo.phoneNum ? userInfo.phoneNum : "ㅡ"}</Font>
              </Content>
              <Content>
                <Label>
                  <Font>GitHub URL</Font>
                </Label>
                <Font>{userInfo.gitUrl ? userInfo.gitUrl : "ㅡ"}</Font>
              </Content>
              <Content>
                <Label>
                  <Font>Blog URL</Font>
                </Label>
                <Font>{userInfo.blogUrl ? userInfo.blogUrl : "ㅡ"}</Font>
              </Content>
              <Content>
                <Label>
                  <Font>직무</Font>
                </Label>
                <Font>{userInfo.job ? userInfo.job : "ㅡ"}</Font>
              </Content>
            </RightBox>
          </UserInfo>
        </UserInfoBox>
        <PortfolioBox>
          <Title>포트폴리오</Title>
          {title
            ?
            <Portfolio>
              <NnE><h2>{userInfo.name ? userInfo.name : "ㅡ"}</h2></NnE>
              <NnE><h3>{userInfo.job}</h3></NnE>
              <NnE><h4>
                {title}
              </h4>
              </NnE>
              <Content style={{ margin: "0px 0px 0px 25px" }}>
                <Stack>{userInfo?.stack[0]}</Stack>
                <Stack>{userInfo?.stack[1]}</Stack>
                <Stack>{userInfo?.stack[2]}</Stack>
              </Content>
            </Portfolio>
          ) : (
            <Portfolio style={{ background: "white" }}>
              <AddProfBox style={{ marginTop: "160px" }}>
                <AddProfButton>
                  <Add />
                  포트폴리오 작성하기
                </AddProfButton>
              </AddProfBox>
              <AddProfBox>
                <AddProfText>
                  아직 작성된 포트폴리오가 없어요.<br></br>내 이야기를 담아
                  개성넘치는 포트폴리오를 만들어 보세요.
                </AddProfText>
              </AddProfBox>
            </Portfolio>
          )}
        </PortfolioBox>
      </Form>
      <ProjTitle style={{ marginTop: "120px" }}>프로젝트</ProjTitle>
      <Project>
        <Portfolio
          style={{
            background: "#ededed",
            width: "450px",
            border: "1px solid #ededed",
          }}
        >
          <AddProfBox style={{ marginTop: "160px" }}>
            <AddProfButton style={{ background: "white" }}>
              <Add />
              프로젝트 추가
            </AddProfButton>
          </AddProfBox>
          <AddProfBox>
            <AddProfText>
              프로젝트 목록이 비어있어요.
              <br></br>프로젝트 추가 버튼을 눌러 내 프로젝트를
              <br></br>포트폴리오에 등록해 보세요.
            </AddProfText>
          </AddProfBox>
        </Portfolio>
      </Project>
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
export const ProjTitle = styled.div`
  width: 96%;
  margin: 0px auto;
  min-width: 1440px;
  max-width: 1900px;
  height: 30px;
  left: 0px;
  margin-top: 160px;
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
  margin: 0px auto;
  min-width: 1440px;
  height: 600px;
  max-width: 1900px;
  min-height: 40vh;
  background: #ffffff;
  display: flex;
  @media screen and (min-width: 1440px) {
    & {
    }
  }
  @media screen and (min-width: 834px) {
    & {
    }
  }
`;

const Project = styled.div`
  margin: 0px auto;
  display: flex;
  width: 96%;
  min-width: 1440px;
  max-width: 1900px;
  height: 602px;
  border-radius: 10px;
  @media only screen and (max-width: 1300px) {
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
  position: relative;
  min-width: 350px;
  width: 32%;
  @media only screen and (max-width: 1300px) {
  }
`;
const UserInfo = styled.div`
  background-color: #ededed;
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
  min-width: 250px;
  margin-right: 24px;
  position: relative;
  @media only screen and (max-width: 1300px) {
  }
`;

const AddProfBox = styled.div`
  margin: 0px 0px 0px 0px;
  width: 100%;
  height: 100px;
  min-width: 45px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 1300px) {
  }
`;
const AddProfButton = styled.button`
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: black;
  background-color: #ededed;
  border-radius: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;
  min-width: 350px;
  height: 80px;
`;
const AddProfText = styled.div`
  width: 482px;
  height: 48px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.01em;
  color: #999999;
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
  background-color: lightblue;
  width: 99%;
  height: 502px;
  border-radius: 10px;
  border: 1px solid white;
  @media only screen and (max-width: 1300px) {
  }
`;

const NnE = styled.div`
  min-width: 350px;
  h1 {
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    margin-bottom: 20px;
    text-align: center;
  }
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 26px;
    margin-bottom: 20px;
    color: #555555;
    text-align: center;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 26px;
    margin: 50px 0px 20px 25px;
    color: #000000;
  }
  h3 {
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    margin-left: 25px;
    color: #333333;
  }
  h4 {
    line-height: 25px;
    width: 85%;
    margin: 0px 25px;
    height: 200px;
    padding: 50px 0px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    color: #333333;
  }
`;

export default MyPage;
