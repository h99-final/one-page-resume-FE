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
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

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
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
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
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
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
        </SwiperSlide>
        <SwiperSlide>
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
                alert("@@");
              }}
            >
              지금 시작하기
            </button>
          </BtnBox>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

const H1 = styled.div`
  width: 100%;
  height: 100vh;
`;

const BtnBox = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  height: fit-content;
  button {
    margin: 0px auto;
    padding: 20px 30px;
    font-size: 18px;
    background: #00c4b4;
    border: none;
    border-radius: 43px;
    color: white;
  }
`;
const TextBox = styled.div`
  width: 100%;
  min-width: 600px;
  h1 {
    margin: 138px 0px 45px 120px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: normal;
    font-size: 56px;
    line-height: 65px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
  h2 {
    margin: 0px 0px 135px 120px;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;
export default Banner;
