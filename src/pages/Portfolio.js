import React, { useEffect, useState } from "react";
import { apis } from "../shared/axios";
import { useParams } from "react-router-dom";

// 리덕스
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as projectActions } from "../redux/modules/setProject";
import { actionCreators as myprojectActions } from "../redux/modules/myproject";
//components
import styled from "styled-components";
import Career from "../components/portfolio/view/Career";
import Stack from "../components/portfolio/view/Stack";
import UserInfo from "../components/portfolio/view/UserInfo";
import Header from "../shared/Header";
import PortfolioIntroduce from "../components/portfolio/view/PortfolioIntroduce";
import Project, { IntroduceContainer } from "./Project";
import ProjectViewIntro from "../components/portfolio/view/ProjectView";
import ShowMore from "../components/portfolio/ShowMore";

const Portfolio = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(myprojectActions.selectedProjectDB(id));
  }, []);

  const projectId = useSelector((state) => state.myproject.selectedProjects);
  console.log(projectId);

  // const [ScrollY, setScrollY] = useState(0);

  // const handleFollow = () => {
  //   setScrollY(window.pageYOffset); // window 스크롤 값을 ScrollY에 저장
  // };

  // useEffect(() => {
  //   console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  // }, [ScrollY]);

  // useEffect(() => {
  //   const watch = () => {
  //     window.addEventListener("scroll", handleFollow);
  //   };
  //   watch(); // addEventListener 함수를 실행
  //   return () => {
  //     window.removeEventListener("scroll", handleFollow); // addEventListener 함수를 삭제
  //   };
  // });

  return (
    <>
      <Header />
      <PortfolioIntroduce />
      <UserInfo />
      <Stack />
      <Career />
      {/* <ProjHeader /> */}
      <CardsContainer>
        {projectId.map((e) => {
          return (
            <>
              <IntroduceContainer>
                <ProjectViewIntro id={e} />
              </IntroduceContainer>
            </>
          );
        })}
      </CardsContainer>
    </>
  );
};

const CardsContainer = styled.div`
  /* position: relative; */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* flex-flow: row nowrap; */
  justify-content: flex-start;
  align-items: center;
`;

export default Portfolio;
