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

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [templateIdx, setTemplateIdx] = useState(0);

  useEffect(() => {
    dispatch(myprojectActions.selectedProjectDB(id));
    apis
      .introPorfGet(id)
      .then((res) => {
        let idx = res.data.data.templateIdx;
        if (
          idx === 1 ||
          idx === 2 ||
          idx === 3 ||
          idx === 7 ||
          idx === 8 ||
          idx === 9 ||
          idx === 13
        ) {
          document.body.style.backgroundColor = "#fff";
          setFontColor("#000");
        } else {
          document.body.style.backgroundColor = "#1F2029";
          setFontColor("#fff");
        }
        setTemplateIdx(idx);
        setTitle(res.data.data.title);
        setContents(res.data.data.contents);
      })
      .catch((error) => {
        alert("포트폴리오가 없습니다.");
      });
    return () => {
      dispatch(projectActions.resetTroubleShooting());
      document.body.style.backgroundColor = "#1F2029";
    };
  }, []);

  const [color, setColor] = useState("");
  const [fontcolor, setFontColor] = useState("");

  useEffect(() => {
    if (templateIdx % 3 === 1 && templateIdx !== 13) {
      setColor("rgba(255, 133, 81, 0.9)");
    }
    if (templateIdx % 3 === 2) {
      setColor("rgba(234, 253, 140, 0.9)");
    }
    if (templateIdx % 3 === 0 && templateIdx !== 0) {
      setColor("rgba(68, 133, 223, 0.9)");
    }
    if (templateIdx === 0) {
      setColor("rgba(256,256,256, 0.9)");
    }
    if (templateIdx === 13) {
      setColor("rgba(0,0,0, 0.9)");
    }
  }, [templateIdx]);

  const projectId = useSelector((state) => state.myproject.selectedProjects);

  return (
    <>
      <TopDown />
      <section>
        <PortfolioBaseHeader
          fontcolor={fontcolor}
          color={color}
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
          <PortfolioIntroduce
            title={title}
            contents={contents}
            templateIdx={templateIdx}
          />
        </div>
        <div id="2" ref={user}>
          <UserInfo />
        </div>
        <div id="3" ref={stack}>
          <Stack color={color} fontcolor={fontcolor} />
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
                      <ProjectViewIntro
                        color={color}
                        fontcolor={fontcolor}
                        id={e}
                      />
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
