import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { apis } from "../../../shared/axios";

const PortfolioIntroduce = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    apis.introPorfGet(id).then((res) => {
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
        <ScrollBox>
          <img
            alt="" src={process.env.PUBLIC_URL + "/img/scroll.svg"} />
          <h1>Scroll Down</h1>
        </ScrollBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 1000px;
  display: inline;
`;

const IntroBox = styled.div`
  margin: 200px auto;
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
const ScrollBox = styled.div`
  text-align: center;
  width: 150px;
  margin: 0px auto;
  height: 60px;
  h1{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #696B7B;
  }
`;

export default PortfolioIntroduce;
