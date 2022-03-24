import React from "react";
import styled from "styled-components";

function PortfolioBuisnesscard(props) {
  const {
    id,
    title,
    userStack,
    content,
    bookmarkCount,
    imageUrl,
    username,
    job,
  } = props;

  return (
    <>
      <Portfolio>
        <NnE>
          <h2>{username ? username : "ㅡ"}</h2>
          <h3>{job ? job : "ㅡ"}</h3>
          <h4>{title ? title : "ㅡ"}</h4>
        </NnE>
        <Content>
          {userStack?.map((e, i) => {
            return <Stack key={`stack-${i}`}>{e}</Stack>;
          })}
        </Content>
      </Portfolio>
    </>
  );
}

const Stack = styled.div`
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  text-align: center;
  color: #cfd3e2;
  border: 1px solid #cfd3e2;
  box-sizing: border-box;
  border-radius: 30px;
  padding: 10px 20px;
  width: fit-content;
  height: 40px;
  margin: 0px 3px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 84%;
  margin: 0px auto;
`;
const Portfolio = styled.div`
  margin: 10px auto;
  background-color: #414457;
  width: 327px;
  height: 410px;
  border-radius: 10px;
  border: 1px solid #414457;
  @media only screen and (max-width: 1300px) {
  }
`;

const NnE = styled.div`
  margin: 0px 25px;
  h2 {
    width: 100%;
    margin-top: 40px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: white;
  }
  h3 {
    margin-top: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #cfd3e2;
  }
  h4 {
    margin-top: 50px;
    height: 150px;
    margin-bottom: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: -0.01em;
    color: white;
  }
`;
export default PortfolioBuisnesscard;
