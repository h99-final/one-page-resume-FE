import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { apis } from '../../../shared/axios';

const Introduce = () => {

  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const [project, setProject] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    apis.projectPorfGet()
      .then((res) => {
        setProject(res.data.data)
      });
  }, []);
  console.log(project)

  return (
    <>
      <Container>
        <TitleBox>
          <h1>
            Project
          </h1>
          <h1>1 2 3 4 5</h1>
        </TitleBox>
        <IntroBox>
          <h1>오픈 API를 활용한 코로나19 예방접종센터 조회</h1>
          <ImgBox>
            <img
              alt=''
              src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/111.jpeg'
            />
            <img
              alt=''
              src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/111.jpeg'
            />
            <img
              alt=''
              src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/111.jpeg'
            />
            <img style={{ marginRight: "0px" }}
              alt=''
              src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/111.jpeg'
            />
          </ImgBox>
          <ContentBox>
            <AboutBox>
              <ContentTitle>ABOUT</ContentTitle>
              <h2>대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다. 국군은 국가의 안전보장과 국토방위의 신성한 의무를 수행함을 사명으로 하며, 그 정치적 중립성은 준수된다. 모든 국민은</h2>
            </AboutBox>
            <StackBox>
              <ContentTitle>TECH STACK</ContentTitle>
              <SubStack><span>Javscrt</span></SubStack>
              <SubStack><span>Javcript</span></SubStack>
              <SubStack><span>Javaipt</span></SubStack>
              <SubStack><span>ript</span></SubStack>
              <SubStack><span>Jascript</span></SubStack>
              <SubStack><span>Javascript</span></SubStack>
              <SubStack><span>Javascript</span></SubStack>
              <SubStack><span>Javascript</span></SubStack>
              <SubStack><span>Javasct</span></SubStack>
            </StackBox>
          </ContentBox>
        </IntroBox>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 800px;
  max-width: 1440px;
  height: 1000px;
`;

const ContentBox = styled.div`
  width: 100%;
  display: flex;
`;

const AboutBox = styled.div`
  width: 66%;
  min-width: 550px;
  margin-right: 50px;
    h2{
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
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #555555;
`

const StackBox = styled.div`
  width: 33%;
  min-width: 400px;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
`;

const TitleBox = styled.div`
  width: 95%;
  height: 30px;
  margin: 10px auto;
  border-bottom: 1px solid black;
  margin-bottom: 50px;
  justify-content: space-between;
  display: flex;
  text-align: left;
  padding: 0px 0px 20px 0px ;
  h1{
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
  height: 630px;
  margin: 0px auto;
  h1{
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
  img{
    width: 327px;
    height: 327px;
    margin-right: 20px;
    border-radius: 10px;
  }
`;

export default Introduce;
