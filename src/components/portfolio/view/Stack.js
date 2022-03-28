import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

const Stack = () => {
  const { id } = useParams();

  const [mainStack, setMainStack] = useState([]);
  const [subStack, setSubStack] = useState([]);

  useEffect(() => {
    apis.porfStackGet(id).then((res) => {
      setMainStack(res.data.data.mainStack);
      setSubStack(res.data.data.subStack);
    });
  }, []);

  return (
    <>
      <Container>
        <TitleBox>
          <h1>Tech Stack</h1>
        </TitleBox>
        <StackBox>
          <Main>
            <h1>Main</h1>
            <ForStack>
              {mainStack.map((s, index) => {
                return (
                  <MainStack key={index}>
                    <span>
                      <img
                        alt=""
                        src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/logo192.png"
                      />
                      {s}
                    </span>
                  </MainStack>
                );
              })}
            </ForStack>
          </Main>
          <Sub>
            <h1>Sub</h1>
            <ForStack>
              {subStack.map((s, index) => {
                return (
                  <SubStack key={index}>
                    <span>{s}</span>
                  </SubStack>
                );
              })}
            </ForStack>
          </Sub>
        </StackBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 570px;
  display: inline;
`;
const SubStack = styled.button`
  width: fit-content;
  background-color: #1f2029;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 100px;
  border: 1px solid #999999;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  margin-right: 15px;
  margin-bottom: 10px;
  span {
    padding: 0px 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    position: relative;
  }
`;

const MainStack = styled.button`
  background-color: #999999;
  width: 120px;
  height: 50px;
  border: 1px solid #999999;
  box-sizing: border-box;
  border-radius: 10px;
  text-align: center;
  margin-right: 15px;
  align-items: center;
  img {
    border-radius: 5px;
    background-color: gray;
    width: 20px;
    height: 20px;
    position: relative;
    top: 5%;
    padding: 1px;
    margin-right: 5px;
    object-fit: cover;
  }
  span {
    font-size: 20px;
    position: relative;
    color: #ffffff;
  }
`;

const ForStack = styled.div`
  height: 50px;
  width: 100%;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0px auto;
  margin-bottom: 70px;
  height: 50px;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-right: 190px;
  }
`;

const Sub = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0px auto;
  height: 88px;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-right: 190px;
  }
`;

const TitleBox = styled.div`
  border-bottom: 1px solid white;
  margin: 0px auto;
  width: 96%;
  height: 60px;
  text-align: left;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const StackBox = styled.div`
  width: 70%;
  height: 210px;
  margin: 150px auto;
`;

const Hr = styled.hr`
  width: 96%;
  margin: 0px auto;
`;
export default Stack;
