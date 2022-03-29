import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// route
import { useParams } from "react-router-dom";
//redux
import { actionCreators } from "../../../redux/modules/setProject";
//apis
import { apis } from "../../../shared/axios";
// components
// import TSPortfolio from "../../portfolio/view/TSPortfolio";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

const ProjectIntroduce = (props) => {
  const { id } = props;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [project, setProject] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [troubleShootings, setTroubleShootings] = useState([]);
  const [is_loading, setIs_loading] = useState(true);

  useEffect(() => {
    // dispatch(actionCreators.setProjectDB(id));
    apis
      .projectGet(id)
      .then((res) => {
        setProject(res.data.data);
      })
      .catch((error) => {
        window.alert(error.response.data.data.errors[0].message);
      });
    return () => setIs_loading(true);
  }, []);

  // 트러블 슈팅 토글 버튼
  // 트러블 슈팅 api

  return (
    <>
      <TitleBox>
        <h1>{project?.title}</h1>
      </TitleBox>
      <IntroBox>
        <ImgBox>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {project?.img?.map((e, i) => {
              return (
                <SwiperSlide>
                  <img key={e.url + `${i}`} alt="" src={e.url} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            // loop={true}
            spaceBetween={10}
            slidesPerView={project?.img?.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper3"
          >
            {project?.img?.map((e, i) => {
              return (
                <SwiperSlide>
                  <img key={e.url + `${i}`} alt="" src={e.url} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ImgBox>
        <ContentBox>
          <StackBox>
            <ContentTitle>TECH STACK</ContentTitle>
            {project?.stack?.map((e, i) => {
              return (
                <SubStack key={e}>
                  <span>{e}</span>
                </SubStack>
              );
            })}
          </StackBox>
          <AboutBox>
            <ContentTitle>ABOUT</ContentTitle>
            <h2>{project?.content}</h2>
          </AboutBox>
        </ContentBox>
      </IntroBox>
    </>
  );
};

const AboutBox = styled.div`
  width: 100%;
  min-height: 120px;
  word-wrap: break-word;
  h2 {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;
const SubStack = styled.button`
  width: fit-content;
  background-color: #1f2029;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 100px;
  border: 1px solid #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  margin-right: 15px;
  margin-top: 10px;
  span {
    padding: 0px 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
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
  margin-bottom: 5px;
`;

const StackBox = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 40px;
`;

const TitleBox = styled.div`
  width: 100%;
  margin: 0px auto;
  margin-top: 100px;
  margin-bottom: 50px;
  justify-content: space-between;
  display: flex;
  text-align: left;
  h1 {
    width: fit-content;
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const IntroBox = styled.div`
  width: 100%;
  height: 80vh;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

const ImgBox = styled.div`
  width: 40%;
  height: 100%;
  min-width: 600px;
  margin-right: 20px;
`;

const ContentBox = styled.div`
  width: 55%;
  height: 100%;
  justify-content: flex-start;
`;
export default ProjectIntroduce;
