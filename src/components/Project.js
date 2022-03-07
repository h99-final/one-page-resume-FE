import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./banner.css";

// import required modules
import { Pagination, Navigation } from "swiper";
import styled from 'styled-components';

const Project = () => {
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
          <H1>지금 시작하기</H1>
        </SwiperSlide>
        <SwiperSlide>
          <H1>지금 시작하기</H1>
        </SwiperSlide>
        <SwiperSlide>
          <H1>지금 시작하기</H1>
        </SwiperSlide>
        <SwiperSlide>
          <H1>지금 시작하기</H1>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

const H1 = styled.h1`
  width: 100%;
  height: 40vh;
  background-color: black;
  color: white;
`;
export default Project;
