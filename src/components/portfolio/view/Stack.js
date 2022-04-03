import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

const Stack = (props) => {
  const { id } = useParams();
  const { color, fontcolor } = props;
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
        <TitleBox fontcolor={fontcolor}>
          <h1>Tech Stack</h1>
        </TitleBox>
        <Hr />
        <StackBox>
          <Main fontcolor={fontcolor}>
            <h1>Main</h1>
            <ForStack>
              {mainStack.map((s, index) => {
                return (
                  <MainStack color={color} key={index}>
                    <span>
                      {s === "C++" ? <img
                        alt=""
                        src="https://s3.amazonaws.com/www.poug.me/stack/C%2B%2B.png"
                      /> :
                        s === "C#" ? <img
                          alt=""
                          src="https://s3.amazonaws.com/www.poug.me/stack/C%23.png"
                        />
                          :
                          <img
                            alt=""
                            src={`https://s3.amazonaws.com/www.poug.me/stack/${s}.png`}
                          />
                      }
                      {s}
                    </span>
                  </MainStack>
                );
              })}
            </ForStack>
          </Main>
          <Sub fontcolor={fontcolor}>
            <h1>Sub</h1>
            <ForStack>
              {subStack.map((s, index) => {
                return (
                  <SubStack fontcolor={fontcolor} key={`stack-${index}`}>
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
  background-color: ${(props) =>
    props.fontcolor === "#fff" ? "#393A47" : "#F4F4F4"};
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 100px;
  border: 1px solid #999999;
  font-style: normal;
  font-weight: 400;
  color: ${(props) => (props.fontcolor === "#fff" ? "#fff" : "#000")};
  font-size: 16px;
  margin-right: 15px;
  margin-bottom: 10px;
  span {
    padding: 0px 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: ${(props) => (props.fontcolor === "#fff" ? "#fff" : "#000")};
    position: relative;
  }
`;

const MainStack = styled.button`
  background-color: ${(props) => props.color};
  width: 120px;
  height: 50px;
  border: ${(props) => `1px solid ${props.color}`};
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
    color: #000;
  }
`;

const ForStack = styled.div`
  height: 100%;
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
    color: ${(props) => props.fontcolor};
    margin-right: 190px;
  }
`;

const Sub = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 0px auto;
  height: 100%;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: ${(props) => props.fontcolor};
    margin-right: 190px;
  }
`;

const TitleBox = styled.div`
  /* border-bottom: 1px solid white; */
  margin: 0px auto;
  padding: 2.5% 2.5% 0 2.5%;
  width: 95%;
  height: 60px;
  text-align: left;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: ${(props) => props.fontcolor};
  }
`;

const StackBox = styled.div`
  width: 77%;
  height: 100%;
  margin: 50px auto;
`;

const Hr = styled.hr`
  width: 95%;
  margin: 0px auto;
  /* color: ${(props) => (props.fontcolor === "#fff" ? "#fff" : "#000")}; */
`;
export default Stack;
