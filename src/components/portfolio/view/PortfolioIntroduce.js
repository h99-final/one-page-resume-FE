import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//style
import styled from "styled-components";
//api
import { apis } from "../../../shared/axios";

const PortfolioIntroduce = (props) => {
  const { id } = useParams();

  const { title, contents, templateIdx } = props;

  return (
    <>
      <Container
        background={
          templateIdx === 7
            ? "https://s3.amazonaws.com/www.poug.me/template/3-1.png"
            : templateIdx === 8
            ? "https://s3.amazonaws.com/www.poug.me/template/3-2.png"
            : templateIdx === 9
            ? "https://s3.amazonaws.com/www.poug.me/template/3-3.png"
            : templateIdx === 10
            ? "https://s3.amazonaws.com/www.poug.me/template/4-1.png"
            : templateIdx === 11
            ? "https://s3.amazonaws.com/www.poug.me/template/4-2.png"
            : templateIdx === 12
            ? "https://s3.amazonaws.com/www.poug.me/template/4-3.png"
            : ""
        }
        templateIdx={templateIdx}
      >
        {templateIdx >= 1 && templateIdx <= 6 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <IntroBox
                templateIdx={templateIdx}
                background={
                  templateIdx === 1
                    ? "https://s3.amazonaws.com/www.poug.me/template/1-1.png"
                    : templateIdx === 2
                    ? "https://s3.amazonaws.com/www.poug.me/template/1-2.png"
                    : templateIdx === 3
                    ? "https://s3.amazonaws.com/www.poug.me/template/1-3.png"
                    : templateIdx === 4
                    ? "https://s3.amazonaws.com/www.poug.me/template/2-1.png"
                    : templateIdx === 5
                    ? "https://s3.amazonaws.com/www.poug.me/template/2-2.png"
                    : templateIdx === 6
                    ? "https://s3.amazonaws.com/www.poug.me/template/2-3.png"
                    : ""
                }
              >
                <TitleBox templateIdx={templateIdx}>
                  <Font templateIdx={templateIdx}>{title}</Font>
                </TitleBox>
              </IntroBox>
              <ContentBox templateIdx={templateIdx}>
                <h1 templateIdx={templateIdx}>{contents}</h1>
              </ContentBox>
            </div>
            {/* <ScrollBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/scroll.svg"} />
              <h1>Scroll Down</h1>
            </ScrollBox> */}
          </>
        ) : (
          <>
            <IntroBox templateIdx={templateIdx}>
              <TitleBox>
                <h1>{title}</h1>
              </TitleBox>
              <ContentBox>
                <h1>{contents}</h1>
              </ContentBox>
            </IntroBox>
            <ScrollBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/scroll.svg"} />
              <h1>Scroll Down</h1>
            </ScrollBox>
          </>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => `url(${props.background}) no-repeat top`};
  background-size: 100%;
  display: inline-block;
  color: ${(props) =>
    props.templateIdx === 1 ||
    props.templateIdx === 2 ||
    props.templateIdx === 3 ||
    props.templateIdx === 7 ||
    props.templateIdx === 8 ||
    props.templateIdx === 9 ||
    props.templateIdx === 13
      ? "#000"
      : "#fff"};
`;

const IntroBox = styled.div`
  margin: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6
      ? "60px 2.5%"
      : props.templateIdx >= 7 || props.templateIdx <= 12
      ? "260px auto"
      : "120px"};
  min-height: 1100px;
  width: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "45%" : "80%"};
  background: ${(props) => `url(${props.background}) no-repeat top center`};
  /* background-size: 100%; */
`;

const TitleBox = styled.div`
  width: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "100%" : "73%"};
  margin-bottom: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "0" : "73px"};
  padding: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "240px 0px" : ""};
  text-align: left;
  word-break: break-all;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 56px;
    line-height: 80px;
    letter-spacing: -0.01em;
  }
`;

const Font = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 56px;
  line-height: 80px;
  letter-spacing: -0.01em;
`;

const ContentBox = styled.div`
  margin: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "240px 2.5%" : ""};
  width: ${(props) =>
    props.templateIdx >= 1 && props.templateIdx <= 6 ? "45%" : "100%"};
  word-wrap: break-word;
  height: 250px;
  h1 {
    padding: ${(props) =>
      props.templateIdx >= 1 && props.templateIdx <= 6 ? "0px 5vw" : ""};
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 32px;
    letter-spacing: -0.01em;
  }
`;

const ScrollBox = styled.div`
  text-align: center;
  width: 150px;
  margin: 0px auto;
  height: 60px;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #696b7b;
  }
`;

export default PortfolioIntroduce;
