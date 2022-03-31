import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { FormText, IconBox } from "../components/makeporf/shared/_sharedStyle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/banner.css";
import Spinner from "./Spinner";
import { IconBoxLeft } from "../components/makeproject/ts/TsModal";

const customStyles = {
  content: {
    top: "53%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "80vw",
    height: "90%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
    background: "#1F2029",
    padding: "0px",
    // overflow: "hidden",
  },
};

function GithubHelper(props) {
  const { help, setHelp } = props;

  Modal.setAppElement("#root");

  function closeModal() {
    setHelp(false);
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={help}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <IconBoxLeft onClick={closeModal}>
        <img alt="" src={process.env.PUBLIC_URL + "/img/close.svg"} />
      </IconBoxLeft>
      <InfoBox>
        <h1>트러블 슈팅을 작성하는데 어려움이 있으신가요?</h1>
        <h2>Github에서 Patch Code를 불러오는 방법을 알려드릴게요.</h2>
      </InfoBox>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper5"
      >
        <SwiperSlide>
          <Box>
            <LeftBox>
              <StepBox>
                <h2>트러블슈팅 작성 STEP 1.</h2>
                <h1>Commit 선택</h1>
                <h2>
                  트러블슈팅을 작성할 파일을 불러오기위해
                  <br />
                  파일이 속한 Commit을 선택해 주세요.
                </h2>
              </StepBox>
            </LeftBox>
            <RightBox>
              <SvgBox>
                <img alt="" src={process.env.PUBLIC_URL + "/img/TL1.svg"} />
              </SvgBox>
            </RightBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <LeftBox>
              <StepBox>
                <h2>트러블슈팅 작성 STEP 2.</h2>
                <h1> Patch Code 선택</h1>
                <h2>트러블슈팅을 작성할 파일을 선택해주세요.</h2>
              </StepBox>
            </LeftBox>
            <RightBox>
              <SvgBox>
                <img alt="" src={process.env.PUBLIC_URL + "/img/TL2.svg"} />
              </SvgBox>
            </RightBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <LeftBox>
              <StepBox>
                <h2>트러블슈팅 작성 STEP 3.</h2>
                <h1>트러블 슈팅 작성</h1>
                <h2>
                  불러온 트러블슈팅의 제목과 상세 내용을 적고 <br />
                  저장버튼을 눌러주세요. 저장된 트러블 슈팅은 <br />
                  commit 별로 저장이 됩니다.
                </h2>
              </StepBox>
            </LeftBox>
            <RightBox>
              <SvgBox>
                <img alt="" src={process.env.PUBLIC_URL + "/img/TL3.svg"} />
              </SvgBox>
            </RightBox>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Modal>
  );
}
const Container = styled.div`
  background-color: #1f2029;
  width: 100%;
  height: 95%;
  /* height: calc(100%-45px); */
`;

const Box = styled.div`
  display: flex;
  margin: 0px auto;
  width: 90%;
  height: 100%;
`;

const LeftBox = styled.div`
  width: 40%;
  height: 100%;
`;

const StepBox = styled.div`
  width: 350px;
  margin: 70px auto;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 20px;
  }
  h2 {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const RightBox = styled.div`
  width: 60%;
  height: 100%;
`;

const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
  padding-bottom: 90px;
  h1 {
    margin-top: 30px;
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 10px;
  }
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #cfd3e2;
  }
  img {
    width: fit-content;
    margin: 0px auto;
    margin-top: 0px;
  }
`;

const SvgBox = styled.div`
  width: fit-content;
  margin: 70px auto;
`;

export default GithubHelper;
