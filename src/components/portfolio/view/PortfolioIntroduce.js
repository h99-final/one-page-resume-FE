import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

const PortfolioIntroduce = () => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    apis.introPorfGet(userInfo.porfId).then((res) => {
      setTitle(res.data.data.title);
      setContents(res.data.data.contents);
    });
  }, []);

  return (
    <>
      <Container>
        <IntroBox>
          <TitleBox>
            <h1>{title}</h1>
          </TitleBox>
          <ContentBox>
            <h1>{contents}</h1>
          </ContentBox>
        </IntroBox>
      </Container>
      <Hr></Hr>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 800px;
  max-width: 1440px;
  height: 800px;
  display: flex;
`;

const IntroBox = styled.div`
  margin: 150px auto;
  width: 80%;
  height: 500px;
`;

const TitleBox = styled.div`
  width: 73%;
  margin-bottom: 70px;
  text-align: left;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 56px;
    line-height: 80px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const ContentBox = styled.div`
  width: 100%;
  height: 250px;
  h1 {
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const Hr = styled.hr`
  width: 96%;
  margin: 0px auto;
`;
export default PortfolioIntroduce;
