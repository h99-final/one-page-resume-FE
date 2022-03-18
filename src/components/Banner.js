import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./banner.css";

// import required modules
import { Parallax, Pagination, Navigation } from "swiper";
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
        modules={[Parallax, Pagination, Navigation]}
        className="mySwiper"
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
              개발자의,
              <br />
              개발자에 의한,
              <br />
              개발자를 위한 서비스
            </h1>
            <h2>
              Portfolio는 내가 보여주고 싶은 프로젝트, 코드, 트러블 슈팅을 한눈에 효과적으로 보여주는 유일한 이력서입니다.
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
              10분으로 만드는
              <br />
              100시간짜리 나만의 포트폴리오
            </h1>
            <h2>
              내가 등록한 프로젝트를 모아 개성있는 포트폴리오로 만들어 보세요.
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
              POUG와 함께라면,
              <br />
              개발자 취업, 너도 할 수 있어.
            </h1>
            <h2>
              여기저기 흩어져 있는 포트폴리오를 하나로 만들어 제출해 보세요.
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
      </Swiper>
    </>
  );
};

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
  height: 500px;
  border: 1px solid black;
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
export default Banner;
