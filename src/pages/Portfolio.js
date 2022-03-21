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
import ProjectView from "../components/portfolio/view/ProjectView";
import ProjHeader from "../shared/ProjHeader";
import TroubleShooting from "../components/project/view/TroubleShooting";
import Project, {
  IntroduceContainer,
  TroubleShootingContainer,
} from "./Project";
import ProjectIntroduce from "../components/project/view/ProjectIntroduce";
import PortfolioIntroduce from "../components/portfolio/view/PortfolioIntroduce";

const Portfolio = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(myprojectActions.selectedProjectDB(id));
  }, []);
  const projectId = useSelector((state) => state.myproject.selectedProjects);
  const is_loading = useSelector((state) => state.setproject.is_loading);
  console.log(projectId, is_loading);
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
      <ProjHeader />

      {projectId?.map((e) => {
        return (
          <>
            <IntroduceContainer>
              <ProjectIntroduce id={e} />
            </IntroduceContainer>
            {/* {ts?.map((t, i) => {
                return (
                  <TroubleShootingContainer>
                    <TroubleShooting id={e} {...t} />
                  </TroubleShootingContainer>
                );
              })} */}
          </>
        );
      })}
    </>
  );
};

// const Container = styled.div`
//   width: 100%;
// `;

// const BumperSection = styled.section`
//   text-align: center;
//   padding: 128px 16px;
// `;

// const HorizontalSection = styled.section`
//   position: relative;
//   width: 100%;
//   min-height: 100vh;
// `;

// const CardsContainer = styled.div`
//   position: relative;
//   height: 100%;
//   padding: 0 0 0 150px;
//   display: flex;
//   flex-flow: row nowrap;
//   justify-content: flex-start;
//   align-items: center;
// `;

export default Portfolio;
