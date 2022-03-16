import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import Banner from "../components/Banner";
import { useSelector } from 'react-redux';
import { apis } from '../shared/axios';
import MainCard from '../components/Element/MainCard';
import PortfolioBuisnesscard from '../components/Element/PortfolioBusinesscard';
const defaultprojects = {
  bookmarkCount: 0,
  content: "",
  id: 0,
  imageUrl: "",
  stack: [],
  title: "",
  userJob: "",
  username: "",
}
const Main = () => {
  const userInfo = useSelector(state => state.user.user)
  // console.log(userInfo)

  const [porf, setPorf] = useState([]);
  const [proj, setProj] = useState([]);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const stack = []
    apis.mainPorf(stack).then((res) => {
      setPorf(res.data.data.slice(index, index + 4));
    });
    apis.mainProj(stack).then((res) => {
      setProj(res.data.data)
    })
  }, [index]);

  console.log(porf)
  console.log(index)
  return (
    <>
      <Container>
        <Header />
        <Banner />
        <PortfolioBox>
          <TitleBox>
            <h1>
              실시간 베스트 포트폴리오
            </h1>
            <h2>
              <button onClick={() => { setIndex(prev => (prev - 4) % 12) }}>{"<"}</button>
              <button onClick={() => { setIndex(prev => (prev + 4) % 12) }}>{">"}</button>
            </h2>
          </TitleBox>
          <Portfolio>
            {porf?.map((e, i) => {
              return (
                <>
                  <PortfolioBuisnesscard key={`${e.id}`} {...e} />
                </>
              )
            })}
          </Portfolio>
        </PortfolioBox>
        <ProjectBox>
          <TitleBox>
            <h1>
              프로젝트 둘러보기
            </h1>
          </TitleBox>
          <Project>


            {proj?.map((e, i) => {
              return (
                <>
                  <MainCard key={`${e.id}`} {...e} />
                </>
              )
            })}
          </Project>
        </ProjectBox>
      </Container>
    </>
  );
};
const Container = styled.div`
  background-color: white;
  position: relative;
  width: 100%;
  height: 100vh;
`;

const Project = styled.div`
  margin: 0px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  min-width: 1440px;
  max-width: 1900px;
  border-radius: 10px;
  @media only screen and (max-width: 1300px) {
  }
`;
const Portfolio = styled.div`
  margin: 0px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  min-width: 1440px;
  max-width: 1900px;
  border-radius: 10px;
  @media only screen and (max-width: 1300px) {
  }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  
  h1{
    margin-left: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #000000;
  }
  h2{
    
    button{
      margin-right: 10px;
      width: 30px;
      height: 30px;
      text-align: center;
      font-weight: bolder;
      border: 1px solid #999999;
      border-radius: 25px;
      background-color: white;
      font-size: 20px;
      :hover{
        background-color: #000000;
        color: white;
        border: none;
      }
    }
  }
`;

const PortfolioBox = styled.div`
  width: 1440px;
  margin: 30px auto;
  height: 500px;
`;

const ProjectBox = styled.div`
  width: 1440px;
  margin: 0px auto;
  height: 1700px;
`;
export default Main;
