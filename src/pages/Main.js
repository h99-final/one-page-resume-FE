import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../shared/Header";
import Banner from "../components/Banner";
import { useSelector } from "react-redux";
import { apis } from "../shared/axios";
import { useHistory } from "react-router-dom";
import MainCard from "../components/Element/MainCard";
import PortfolioBuisnesscard from "../components/Element/PortfolioBusinesscard";
import FetchMore from "../shared/FetchMore";
import Spinner from "../shared/Spinner";
import { debounce } from "../shared/common";
const defaultprojects = {
  bookmarkCount: 0,
  content: "",
  id: 0,
  imageUrl: "",
  stack: [],
  title: "",
  userJob: "",
  username: "",
};
// 사이즈 불러와줌
export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", debounce(handleResize, 50));
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const Main = () => {
  const size = useWindowSize();

  const history = useHistory();

  const [porf, setPorf] = useState([]);
  const [proj, setProj] = useState([]);
  const [index, setIndex] = useState(0);
  const [num, setNum] = useState(4);

  useEffect(() => {
    if (size.width < 1040 && size.width > 700) {
      setNum(2);
    }
    if (size.width <= 1378 && size.width > 1040) {
      setNum(3);
    }
    if (size.width > 1378) {
      setNum(4);
    }
  }, [size.width]);

  useEffect(() => {
    const stack = [];
    apis.mainPorf(stack).then((res) => {
      setPorf(res.data.data.slice(index, index + num));
    });
  }, [index, num]);

  //무한 스크롤
  const [page, setPage] = useState(0);
  const [is_loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  let stack = [];

  useEffect(() => {
    setLoading(true);
    if (hasMore) {
      apis.mainProj(stack, page).then((res) => {
        if (res.data.data.length === 0) {
          setHasMore(false);
          setLoading(false);
          return;
        }
        setProj((prev) => [...prev, ...res.data.data]);
      });
    } else {
      setLoading(false);
      return;
    }
    setLoading(false);
    return () => {
      setLoading(false);
      setHasMore(true);
    };
  }, [page]);

  return (
    <>
      <Container key={`main`}>
        <Header />
        <Banner />
        <PortfolioBox>
          <TitleBox>
            <h1>실시간 베스트 포트폴리오</h1>
            <div>
              <img onClick={() => {
                setIndex((prev) => (prev - num) % 12);
              }}
                style={{ marginRight: "10px" }}
                alt="" src={process.env.PUBLIC_URL + "/img/goLeft.svg"} />

              <img onClick={() => {
                setIndex((prev) => (prev + num) % 12);
              }}
                style={{ marginRight: "24px" }}
                alt="" src={process.env.PUBLIC_URL + "/img/goRight.svg"} />
            </div>
          </TitleBox>
          <Portfolio>
            {porf?.map((e, i) => {
              return (
                <div
                  key={`porf-${e.porfId}-${i}`}
                  onClick={() => history.push(`/portfolio/${e.porfId}`)}
                >
                  <PortfolioBuisnesscard {...e} />
                </div>
              );
            })}
          </Portfolio>
        </PortfolioBox>
        <ProjectBox>
          <TitleBox>
            <h1>프로젝트 둘러보기</h1>
          </TitleBox>
          <Project>
            {proj?.map((e, i) => {
              return (
                <>
                  <MainCard key={`project-${e.id}-${i}`} {...e} />
                </>
              );
            })}
          </Project>
        </ProjectBox>
        {is_loading ? <Spinner /> : null}
      </Container>
      <FetchMore is_loading={page !== 0 && is_loading} setPage={setPage} />
    </>
  );
};

const Container = styled.div`
  background-color: #1f2029;
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 730px;
  display: inline-block;
`;

const Project = styled.div`
  margin: 0px auto;
  flex-wrap: wrap;
  display: flex;
  width: 98%;
  @media only screen and (max-width: 1300px) {
  }
`;
const Portfolio = styled.div`
  margin: 0px auto;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  width: 98%;
  height: 430px;
  overflow: hidden;
  border-radius: 10px;
  justify-content: space-around;
  @media only screen and (max-width: 1300px) {
  }
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  h1 {
    margin-left: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: white;
  }
    button {
      margin-right: 10px;
      align-items: center;

      border-radius: 100px;
      border: 1px solid inherit;
      :hover {
        background-color: #000000;
        color: white;
        border: 1px solid black;
      }
    }
  
`;

const PortfolioBox = styled.div`
  width: 100%;
  margin: 30px auto;
  height: 500px;
  max-width: 1440px;
`;

const ProjectBox = styled.div`
  width: 100%;
  margin: 0px auto;
  max-width: 1440px;
`;
export default Main;
