import React, { useState } from "react";
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
import Modal from './loginModal/Modal';

const Banner = () => {
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };
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
        <SwiperSlide
          style={{
            background: "linear-gradient(180deg, #8BFF9E -71%, #00A497 91.67%)",
          }}
        >
          <Box>
            <TextBox>
              <h1>
                개발자 포트폴리오 만들기,
                <br />
                어디까지 해보셨나요?
              </h1>
              <h2 style={{ marginTop: "30px" }}>
                개발자들은 포트폴리오 제작을 위해 평균 n시간을 투자하고 있어요.
              </h2>

              <BtnBox style={{ marginTop: "140px" }}>
                {userInfo ?
                  <button
                    onClick={() => { history.replace(`/write/portfolio/introduce/${userInfo.porfId}`); }}>
                    지금 시작하기
                  </button> :
                  <button onClick={() => { modalClose(); }}>
                    지금 시작하기
                  </button>
                }
              </BtnBox>
            </TextBox>

            <ContentBox >
              <img
                style={{ width: "665px" }}
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/Banner1.gif"
              />
            </ContentBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide
          style={{
            background: `linear-gradient(180deg, #000000 -6.08%, #151724 41.36%, #2E3558 105%)`,
          }}
        >
          <Box>
            <TextBox>
              <h1>
                <img
                  style={{ width: "333px", marginBottom: "30px" }}
                  alt=""
                  src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/text.gif"
                />
              </h1>
              <h2>
                Portfolio는 내가 보여주고 싶은 프로젝트와 트러블 슈팅을
                <br />
                한눈에 효과적으로 보여주는 유일한 이력서입니다.
              </h2>

              <BtnBox style={{ marginTop: "60px" }}>
                {userInfo ?
                  <button
                    onClick={() => { history.replace(`/write/portfolio/introduce/${userInfo.porfId}`); }}>
                    지금 시작하기
                  </button> :
                  <button onClick={() => { modalClose(); }}>
                    지금 시작하기
                  </button>
                }
              </BtnBox>
            </TextBox>

            <ContentBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/banner2.svg"} />
            </ContentBox>
          </Box>
        </SwiperSlide>

        <SwiperSlide
          style={{
            background:
              "linear-gradient(180deg, #002E73 -23.33%, #E498FF 118.67%)",
          }}
        >
          <Box>
            <TextBox>
              <h1>
                10분으로 만드는
                <br />
                100시간짜리 나만의 포트폴리오
              </h1>
              <h2 style={{ marginTop: "30px" }}>
                내가 등록한 프로젝트들을 모아 나의 개성을 드러내는 포트폴리오로
                만들어 보세요.
              </h2>
              <BtnBox style={{ marginTop: "140px" }}>
                {userInfo ?
                  <button
                    onClick={() => { history.replace(`/write/portfolio/introduce/${userInfo.porfId}`); }}>
                    지금 시작하기
                  </button> :
                  <button onClick={() => { modalClose(); }}>
                    지금 시작하기
                  </button>
                }
              </BtnBox>
            </TextBox>

            <ContentBox>
              <img
                alt=""
                src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/Banner3.gif"
              />
            </ContentBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide
          style={{
            background: "cover",
            backgroundImage: `url("https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/BG4.png")`
          }}
        >
          <Box style={{ display: "inline", position: "relative" }}>
            <SvgBox >
              <img
                style={{ borderRadius: "0px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/BG5.svg"}
              />
            </SvgBox>

            <BtnBox style={{ textAlign: "center" }}>
              {userInfo ?
                <button
                  onClick={() => { history.replace(`/write/portfolio/introduce/${userInfo.porfId}`); }}>
                  지금 시작하기
                </button> :
                <button onClick={() => { modalClose(); }}>
                  지금 시작하기
                </button>
              }
            </BtnBox>
            <GifBox
              style={{
                textAlign: "center",
                position: "fixed",
                right: "400px",
                top: "-140px",
              }}
            >
              <button>
                <img
                  style={{ width: "60%" }}
                  alt=""
                  src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/planet.gif"
                />
              </button>
            </GifBox>
            <GifBox
              style={{
                height: "30px",
                textAlign: "center",
                position: "fixed",
                left: "560px",
                top: "-10px",
              }}
            >
              <button>
                <img
                  style={{ width: "400px", height: "440px" }}
                  alt=""
                  src="https://ricefriendimage.s3.ap-northeast-2.amazonaws.com/ship.gif"
                />
              </button>
            </GifBox>
          </Box>
        </SwiperSlide>
      </Swiper>

      {modalOpen && <Modal modalClose={modalClose}></Modal>}
    </>
  );
};
const Box = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 1440px;
  min-width: 1000px;
  margin: 0px auto;
`;

const BtnBox = styled.div`
  width: 100%;
  text-align: left;
  height: fit-content;
  margin-top: 110px;
  button {
    &:hover {
      background: white;
      transition: all 0.3s ease;
      color: black;
    }
    cursor: pointer;
    margin: 0px auto;
    padding: 15px 50px;
    font-size: 18px;
    background: inherit;
    border: 1px solid white;
    border-radius: 43px;
    color: white;
  }
  img {
    margin: 0px auto;
    padding: 15px 30px;
    border: 1px solid;
  }
`;
const GifBox = styled.div`
  width: 100%;
  text-align: left;
  height: fit-content;
  margin-top: 160px;
  button {
    margin: 0px auto;
    padding: 5px 10px;
    font-size: 18px;
    background: inherit;
    border: none;
    color: white;
  }
`;
const TextBox = styled.div`
  min-width: 650px;
  margin: 0px auto;
  margin-top: 40px;
  padding-top: 50px;
  padding-left: 120px;
  h1 {
    width: fit-content;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 600;
    font-size: 48px;
    line-height: 65px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
  h2 {
    width: fit-content;
    font-family: "Pretendard";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const ContentBox = styled.div`
  width: 50%;
  img {
    width: 650px;
  }
`;

const SvgBox = styled.div`
  width: fit-content;
  margin: 0px auto;
  margin-bottom: 100px;
  padding-top: 150px;
`;

export default Banner;
