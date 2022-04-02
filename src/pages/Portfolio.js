import React, { useEffect, useRef, useState } from "react";
import { apis } from "../shared/axios";
import { useHistory, useParams } from "react-router-dom";

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
import Spinner from "../shared/Spinner";

const Portfolio = () => {
  const history = useHistory();
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

  const [is_loading, setIs_loading] = useState(true);

  const [fontcolor, setFontColor] = useState("");
  const [color, setColor] = useState("");

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
          document.body.style.color = "#000";
          setFontColor("#000");
        } else {
          document.body.style.backgroundColor = "#1F2029";
          document.body.style.color = "#fff";
          setFontColor("#fff");
        }
        setTemplateIdx(idx);
        setTitle(res.data.data.title);
        setContents(res.data.data.contents);

        // 1, 4, 7, 10
        if (idx === 1 || idx === 4 || idx === 7 || idx === 10) {
          setColor("rgba(255, 133, 81, 0.9)");

          return setIs_loading(false);
        }
        // 2, 5, 8, 11
        else if (idx === 2 || idx === 5 || idx === 8 || idx === 11) {
          setColor("#EAFD8C");
          return setIs_loading(false);
        }
        // 3, 6, 9, 12
        else if (idx === 3 || idx === 6 || idx === 9 || idx === 12) {
          setColor("rgba(68, 133, 223, 0.9)");
          return setIs_loading(false);
        }
        // 0
        else if (idx === 0) {
          setColor("rgba(256,256,256, 0.9)");
          return setIs_loading(false);
        }
        // 13
        else if (idx === 13) {
          setColor("rgba(0,0,0, 0.9)");
          return setIs_loading(false);
        }
      })
      .catch((error) => {
        history.push("/");
        alert("포트폴리오가 없습니다.");
        setIs_loading(false);
      });
    return () => {
      dispatch(projectActions.resetTroubleShooting());
      document.body.style.backgroundColor = "#1F2029";
      setIs_loading(true);
    };
  }, []);

  useEffect(() => {
    return () => {
      setIs_loading(true);
    };
  }, []);

  const projectId = useSelector((state) => state.myproject.selectedProjects);

  return (
    <>
      {is_loading ? (
        <Spinner />
      ) : (
        <>
          <TopDown />
          <section>
            <PortfolioBaseHeader
              templateIdx={templateIdx}
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
              <UserInfo
                color={color}
                fontcolor={fontcolor}
                templateIdx={templateIdx}
              />
            </div>
            <div id="3" ref={stack}>
              <Stack color={color} fontcolor={fontcolor} />
            </div>
            <div id="4" ref={career}>
              <Career
                color={color}
                fontcolor={fontcolor}
                templateIdx={templateIdx}
              />
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
            <PortfolioFooter fontcolor={fontcolor} />
          </section>
        </>
      )}
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
