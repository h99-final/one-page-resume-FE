import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./banner.css";

// import required modules
import { Parallax, Pagination, Navigation, Autoplay } from "swiper";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const Banner = () => {
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        speed={600}
        parallax={true}
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Parallax, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      // autoplay={{
      //   delay: 5000,
      //   disableOnInteraction: false,
      // }}
      >
        <div
          slot="container-start"
          className="parallax-bg"
          style={{
            backgroundColor: "#000000",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>
          <Box style={{
            backgroundImage: `url("https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/BG1.png")`,
          }}
          >
            <GifBox style={{ top: "114px", left: "731px" }}>
              <img
                alt=''
                src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/%E1%84%82%E1%85%A2%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%80%E1%85%AE%E1%84%89%E1%85%A5%E1%86%BC.gif' />
            </GifBox>
            <GifBox style={{ top: "22px", left: "881px" }}>
              <img
                alt=''
                src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/%E1%84%83%E1%85%B5%E1%84%8C%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB.gif' />
            </GifBox>
            <GifBox style={{ top: "44px", left: "1077px" }}>
              <img
                alt=''
                src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/%E1%84%91%E1%85%A5%E1%84%87%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%84%89%E1%85%B5%E1%86%BC.gif' />
            </GifBox>
            <GifBox style={{ top: "134px", left: "1205px" }}>
              <img
                alt=''
                src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/%E1%84%8B%E1%85%B2%E1%84%8C%E1%85%B5%E1%84%87%E1%85%A9%E1%84%89%E1%85%AE.gif' />
            </GifBox>
            <TextBox>

              <h1>
                개발자 포트폴리오 만들기,
                <br />
                어디까지 해보셨나요?
              </h1>
              <h2>
                개발자들은 포트폴리오 제작을 위해 평균 n시간을 투자하고 있어요.
              </h2>
            </TextBox>
            <BtnBox>
              <button
                onClick={() => {
                  history.replace(
                    `/write/portfolio/introduce/${userInfo.porfId}`
                  );
                }}
              >
                지금 시작하기
              </button>
            </BtnBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box style={{
            backgroundImage: `url("https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/BG2.png")`,
          }}>
            <TextBox>
              <h1>
                개발자의,
                <br />
                개발자에 의한,
                <br />
                개발자를 위한 서비스
              </h1>
              <h2>
                Portfolio는 내가 보여주고 싶은 프로젝트와 트러블 슈팅을<br />
                한눈에 효과적으로 보여주는 유일한 이력서입니다.
              </h2>
            </TextBox>
            <BtnBox>
              <button
                onClick={() => {
                  history.replace(
                    `/write/portfolio/introduce/${userInfo.porfId}`
                  );
                }}
              >
                지금 시작하기
              </button>
            </BtnBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box style={{
            background: "linear-gradient(180deg, #8BFF9E -71%, #00A497 91.67%)"
            // backgroundImage: `url("https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/BG3.png")`,
          }}>
            <GifBox style={{ top: "71px", left: "863px", width: "420px", height: "500px" }}>
              <img
                alt=''
                src='https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/%E1%84%86%E1%85%A7%E1%86%BC%E1%84%92%E1%85%A1%E1%86%B7.gif' />
            </GifBox>
            <TextBox>
              <h1>
                10분으로 만드는
                <br />
                100시간짜리 나만의 포트폴리오
              </h1>
              <h2>
                내가 등록한 프로젝트들을 모아 나의 개성을 드러내는 포트폴리오로 만들어 보세요.
              </h2>
            </TextBox>
            <BtnBox>
              <button
                onClick={() => {
                  history.replace(
                    `/write/portfolio/introduce/${userInfo.porfId}`
                  );
                }}
              >
                지금 시작하기
              </button>
            </BtnBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box style={{
            backgroundImage: `url("https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/BG4.png")`,
          }}>
            <SvgBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/BG5.svg"} />
            </SvgBox>

            <BtnBox style={{ textAlign: "center" }}>
              <button
                style={{ marginLeft: "0px" }}
                onClick={() => {
                  history.replace(
                    `/write/portfolio/introduce/${userInfo.porfId}`
                  );
                }}
              >
                지금 시작하기
              </button>
            </BtnBox>
          </Box>
        </SwiperSlide>
      </Swiper>
    </>
  );
};
const Box = styled.div`
width: 100%;
height: 100%;
display: block;
`;

const BtnBox = styled.div`
  width: 100%;
  text-align: left;
  height: fit-content;
  
  button {
    &:hover { background: #00c4b4; transition: all 1s ease; } cursor: pointer;
    margin: 0px auto;
    margin-left: 120px;
    padding: 15px 30px;
    font-size: 18px;
    background: inherit;
    border: 1px solid white;
    border-radius: 43px;
    color: white;
  }
`;
const TextBox = styled.div`
  width: 80%;
  min-width: 600px;
  height: 350px;
  padding-top: 100px;
  h1 {
    margin: 0px 0px 30px 120px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 65px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
  h2 {
    margin: 0px 0px 0px 120px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const SvgBox = styled.div`
  width: fit-content;
  margin: 0px auto;
  margin-bottom: 100px;
  padding-top: 150px;
`;

const GifBox = styled.div`
  width: 180px;
  height: 100px;
  position: absolute;
  img{
  }
`;
export default Banner;
