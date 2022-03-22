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
import ProjHeader from "../shared/ProjHeader";
import ProjectIntroduce from "../components/project/view/ProjectIntroduce";
import PortfolioIntroduce from "../components/portfolio/view/PortfolioIntroduce";
import TSPortfolio from "../components/portfolio/view/TSPortfolio";

//swipe
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import ShowMore from "../components/portfolio/ShowMore";

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
      <CardsContainer>
        <Swiper
          direction={"vertical"}
          spaceBetween={1000}
          slidesPerView={1}
          loop={true}
          pagination={true}
          modules={[Pagination, Mousewheel]}
          className="mySwiper"
          mousewheel={true}
        >
          {projectId?.map((e) => {
            return (
              <>
                <SwiperSlide>
                  <ProjectIntroduce key={`${e.id}` + e.title} id={e} />
                  <ShowMore />
                </SwiperSlide>
              </>
            );
          })}
        </Swiper>
      </CardsContainer>
    </>
  );
};

const SwiperContent = styled(SwiperSlide)``;

const CardsContainer = styled.div`
  /* position: relative; */
  width: 80vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
  & > .swiper {
    background-color: #1f2029;
    height: 85vh;
  }
  & > .swiper-slide {
  }
  & > .pagination {
    color: #fff;
  }
`;

export default Portfolio;
