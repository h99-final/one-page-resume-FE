import React, { useEffect, useRef, useState } from "react";
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
import PortfolioIntroduce from "../components/portfolio/view/PortfolioIntroduce";
import Project, { IntroduceContainer } from "./Project";
import ProjectViewIntro from "../components/portfolio/view/ProjectView";
import PortfolioBaseHeader from "../components/portfolio/PortfolioBaseHeader";
import TopDown from "../shared/TopDown";
import PortfolioFooter from "../components/portfolio/PortfolioFooter";

const Portfolio = () => {
  const intro = useRef(null);
  const user = useRef(null);
  const stack = useRef(null);
  const career = useRef(null);
  const project = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(myprojectActions.selectedProjectDB(id));
    return dispatch(projectActions.resetTroubleShooting());
  }, []);

  const projectId = useSelector((state) => state.myproject.selectedProjects);

  return (
    <>
      <TopDown />
      <section>
        <PortfolioBaseHeader
          projectId={projectId}
          intro={intro}
          user={user}
          stack={stack}
          career={career}
          project={project}
          id={id}
          // refs={refs}
        />
        <div id="1" ref={intro}>
          <PortfolioIntroduce />
        </div>
        <div id="2" ref={user}>
          <UserInfo />
        </div>
        <div id="3" ref={stack}>
          <Stack />
        </div>
        <div id="4" ref={career}>
          <Career x />
        </div>

        <div id="5" ref={project}>
          <CardsContainer>
            {projectId.map((e, i) => {
              return (
                <>
                  <div key={`troubleshow-${i}-${e.id}`}>
                    <IntroduceContainer id={`${i + 5}`}>
                      <ProjectViewIntro id={e} />
                    </IntroduceContainer>
                  </div>
                </>
              );
            })}
          </CardsContainer>
        </div>
        <PortfolioFooter />
      </section>
    </>
  );
};

const CardsContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export default Portfolio;
