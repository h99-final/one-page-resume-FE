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
import styled from 'styled-components';

const Banner = () => {
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
            "background-image":
              "url(https://swiperjs.com/demos/images/nature-3.jpg)",
          }}
          data-swiper-parallax="-23%"
        ></div>
        <SwiperSlide>

          <button>지금 시작하기</button>
        </SwiperSlide>
        <SwiperSlide>
          <div className="title" data-swiper-parallax="-300">
            Slide 1
          </div>
          <div className="subtitle" data-swiper-parallax="-200">
            Subtitle
          </div>
          <div className="text" data-swiper-parallax="-100">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
              laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
              Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
              Aliquam hendrerit lorem at elit facilisis rutrum. Ut at
              ullamcorper velit. Nulla ligula nisi, imperdiet ut lacinia nec,
              tincidunt ut libero. Aenean feugiat non eros quis feugiat.
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
        </SwiperSlide>
        <SwiperSlide>
          <H1>
            <Btn>지금 시작하기</Btn>
          </H1>
        </SwiperSlide>
        <SwiperSlide>
          <H1>
          </H1>

          <Btn>지금 시작하기</Btn>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

const H1 = styled.div`
  width: 100%;
  height: 100vh;
  
`;

const Btn = styled.button`
font-size: 18px;
  background: black;
  border: none;
  border-radius: 43px;
  width: 211px;
  height: 62px;
  color: white;
`
export default Banner;
