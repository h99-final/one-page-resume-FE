import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { actionCreators } from "../../../redux/modules/career";
import { apis } from "../../../shared/axios";

const Career = ({ color, fontcolor, templateIdx }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const careers = useSelector((state) => state.career.careers);

  const contrastcolor = () => {
    if (fontcolor === "#fff") {
      let contrast = "#000";
      return contrast;
    } else {
      let contrast = "#fff";
      return contrast;
    }
  };

  useEffect(() => {
    dispatch(actionCreators.setCareerDB(id));
  }, []);

  return (
    <>
      {templateIdx >= 1 && templateIdx <= 6 ? (
        <>
          {" "}
          <TitleBox>
            <h1>Work Experience</h1>
          </TitleBox>
          <div style={{ display: "flex", marginBottom: "150px" }}>
            <LeftContainer>
              {careers.map((e, i) => {
                if ((i + 1) % 2 === 1) {
                  return (
                    <>
                      <NewCareerBox
                        color={color}
                        fontcolor={fontcolor}
                        contrastcolor={contrastcolor()}
                        index={i}
                        key={`odd-career-${i}`}
                      >
                        <Index>{i + 1}</Index>
                        <Title>{e.title}</Title>
                        <Date>
                          {e.startTime}~{e.endTime}
                        </Date>
                        <Content>
                          {e.contents.map((c, index) => {
                            return <h1 key={`content-${index}`}>{c}</h1>;
                          })}
                        </Content>
                      </NewCareerBox>
                    </>
                  );
                }
              })}
            </LeftContainer>
            <RightContainer>
              {careers.map((e, i) => {
                if ((i + 1) % 2 === 0) {
                  return (
                    <>
                      <NewCareerBox
                        color={color}
                        fontcolor={fontcolor}
                        contrastcolor={contrastcolor()}
                        index={i}
                        key={`odd-career-${i}`}
                      >
                        <Index>{i + 1}</Index>
                        <Title>{e.title}</Title>
                        <Date>
                          {e.startTime}~{e.endTime}
                        </Date>
                        <Content>
                          {e.contents.map((c, index) => {
                            return <h1 key={index}>{c}</h1>;
                          })}
                        </Content>
                      </NewCareerBox>
                    </>
                  );
                }
              })}
            </RightContainer>
          </div>
        </>
      ) : (
        <Container fontcolor={fontcolor}>
          <TitleBox>
            <h1>Work Experience</h1>
          </TitleBox>
          <Box>
            {careers.map((e) => {
              return (
                <CareerBox
                  templateIdx={templateIdx}
                  key={e.id}
                  color={color}
                  fontcolor={fontcolor}
                >
                  <Label>
                    <h1>{e.title}</h1>
                    <h2>
                      {e.startTime} ~ {e.endTime}
                    </h2>
                  </Label>

                  <CareerContent
                    templateIdx={templateIdx}
                    fontcolor={fontcolor}
                  >
                    <CareerTitle
                      templateIdx={templateIdx}
                      fontcolor={fontcolor}
                    >
                      <h1>{e.subTitle}</h1>
                    </CareerTitle>
                    {e.contents.map((c, index) => {
                      return <h1 key={index}>{c}</h1>;
                    })}
                  </CareerContent>
                </CareerBox>
              );
            })}
          </Box>
        </Container>
      )}
    </>
  );
};

const Content = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 40px;
`;

const Date = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  margin-top: 17px;
  color: ${(props) => (props.fontcolor === "#fff" ? "#cfd3e2" : "#cccccc")};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  margin-top: 20px;
`;

const Index = styled.div`
  font-weight: 600;
  font-size: 36px;
  line-height: 72px;
`;

const LeftContainer = styled.div`
  width: 45%;
  margin: 0px 2.5%;
  height: 100%;
  color: ${(props) => props.fontcolor};
`;
const RightContainer = styled.div`
  width: 45%;
  margin: 0px 2.5%;
  height: 100%;
  color: ${(props) => props.fontcolor};
`;

const Container = styled.div`
  width: 100%;
  display: inline;
  color: ${(props) => (props.fontcolor === "#fff" ? "#fff" : "#000")};
  margin-bottom: 150px;
`;

const Box = styled.div`
  width: 96%;
  margin: 31px auto;
`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12
      ? "none"
      : (props) =>
          props.fontcolor === "#fff" ? "1px solid #fff" : "1px solid #000"};
  border-bottom: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12
      ? "none"
      : (props) =>
          props.fontcolor === "#fff" ? "1px solid #fff" : "1px solid #000"};
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;

    margin-right: 190px;
  }
  margin: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12 ? "50px" : ""};
`;

const Label = styled.div`
  width: 30%;
  height: 100%;
  text-align: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12 ? "" : "center"};
  align-items: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12 ? "" : "center"};
  h1 {
    margin: auto;
    margin-top: 35px;
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
  h2 {
    margin: auto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: ${(props) => (props.fontcolor === "#fff" ? "#cfd3e2" : "#cccccc")};
  }
`;
const CareerContent = styled.div`
  width: 70%;
  height: 100%;
  border-left: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12
      ? "none"
      : (props) =>
          props.fontcolor === "#fff" ? "1px solid #fff" : "1px solid #000"};
  h1 {
    padding: 10px 20px;
    width: 80%;
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
`;
const CareerTitle = styled.div`
  width: 100%;
  height: 65px;
  border-bottom: ${(props) =>
    props.templateIdx >= 7 && props.templateIdx <= 12
      ? "none"
      : (props) =>
          props.fontcolor === "#fff" ? "1px solid #fff" : "1px solid #000"};
  align-items: center;
  h1 {
    padding: 20px;
    width: 80%;
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
  }
`;
const TitleBox = styled.div`
  margin: 200px auto 100px auto;
  width: 96%;
  height: 30px;
  text-align: left;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
  }
`;

const NewCareerBox = styled.div`
  width: calc(100% - 80px);
  height: calc(100% - 80px);
  padding: 40px;
  border: 1px solid
    ${(props) =>
      props.index % 4 === 1 || props.index % 4 === 2
        ? `${props.fontcolor}`
        : `${props.color}`};
  background-color: ${(props) =>
    props.index % 4 === 0 || props.index % 4 === 3
      ? `${props.color}`
      : "transparent"};
  margin-bottom: 36px;
  color: ${(props) =>
    props.templateIdx === 3 || props.templateIdx === 6
      ? props.index % 4 === 0 || props.index % 4 === 3
        ? "#fff"
        : `${props.fontcolor}`
      : `${props.fontcolor}`};
`;

export default Career;
