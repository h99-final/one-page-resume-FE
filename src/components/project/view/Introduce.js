import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { apis } from '../../../shared/axios';
import { useParams } from 'react-router-dom';
import { actionCreators } from '../../../redux/modules/setProject';
import ProjHeader from '../../../shared/ProjHeader';

const Introduce = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [contents, setContents] = useState("");

  useEffect(() => {
    dispatch(actionCreators.setProjectDB(id));
  }, []);

  const project = useSelector((state) => state.setproject.project);
  console.log(project);

  return (
    <>
      <Container>
        <TitleBox>
          <h1>Project</h1>
          <h1>1 2 3 4 5</h1>
        </TitleBox>
        <IntroBox>
          <h1>{project?.title}</h1>
          <ImgBox>
            {project?.img?.map((e, i) => {
              return (
                <>
                  <img
                    key={e.url + `${i}`}
                    alt=''
                    src={e.url}
                  />
                </>
              );
            })}
          </ImgBox>
          <ContentBox>
            <AboutBox>
              <ContentTitle>ABOUT</ContentTitle>
              <h2>{project?.content}</h2>
            </AboutBox>
            <StackBox>
              <ContentTitle>TECH STACK</ContentTitle>
              {project?.stack?.map((e, i) => {
                return (
                  <SubStack key={i}>
                    <span>{e}</span>
                  </SubStack>
                );
              })}
            </StackBox>
          </ContentBox>
        </IntroBox>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

const ContentBox = styled.div`
  width: fit-content;
  display: flex;
  margin: 0px auto;
`;

const AboutBox = styled.div`
  width: fit-content;
  min-width: 550px;
  margin-right: 50px;
  h2 {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;
const SubStack = styled.button`
  width: fit-content;
  background-color: white;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 100px;
  border: 1px solid #999999;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #333333;
  margin-right: 15px;
  margin-bottom: 10px;
  span {
    padding: 0px 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #333333;
    position: relative;
  }
`;
const ContentTitle = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #555555;
`;

const StackBox = styled.div`
  width: 33%;
  min-width: 400px;
`;

const TitleBox = styled.div`
  width: 95%;
  margin: 60px auto;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
  justify-content: space-between;
  display: flex;
  text-align: left;
  padding: 0px 0px 20px 0px;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;

const IntroBox = styled.div`
  width: 95%;
  min-height: 630px;
  margin: 0px auto;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #191919;
    margin-bottom: 50px;
  }
`;

const ImgBox = styled.div`
  width: 100%;
  margin-bottom: 50px;
  flex-direction: row;
  justify-content: space-around;
  display: flex;
  img {
    width: 322px;
    height: 322px;
    margin: 0px 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }
`;

export default Introduce;
