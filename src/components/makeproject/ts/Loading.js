import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Content,
  FormText,
  FormTitle,
  IconBox,
  Inner,
  InputCustom,
  Label,
} from "../../makeporf/shared/_sharedStyle";
import { Font, FormContents } from "../../makeporf/view/Introduce";
import styled from "styled-components";
import PreviousNextProject from "../PreviousNextProject";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../../redux/modules/patchcode";
import { apis } from "../../../shared/axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../banner.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "100vw",
    height: "100%",
    transform: "translate(-50%, -50%)",
    position: "fixed",
    background: "#1F2029",

    // overflow: "hidden",
  },
};

function Loading(props) {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const { helpModalOpen, setHelpModalOpen } = props;

  function closeModal() {
    setHelpModalOpen(false);
  }


  Modal.setAppElement("#root");

  return (
    <Modal
      ariaHideApp={false}
      isOpen={helpModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <IconBoxLeft onClick={closeModal}>
        <img alt="" src={process.env.PUBLIC_URL + "/img/close.svg"} />
      </IconBoxLeft>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper5"
      >
        <SwiperSlide>
          <Box>
            <InfoBox>
              <h1>Git Token 인증은 왜 해야하나요?</h1>
              <h2>
                2021년 8월 13일 이후로 Github API에 접속 시 패스워드 방식의 인증을<br />
                지원하지 않습니다. 대신 개인 토큰(a personal access token)을 발급받아서<br />
                접속해야 합니다. 포그는 유저님이 트러블슈팅 코멘트를 쉽게 작성하실 수 있도록<br />
                Github API를 이용해 Repository를 불러오기 때문에 유저님의 Git token 인증이 필요합니다.
              </h2>
            </InfoBox>
            <SvgBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/TH1.svg"} />
            </SvgBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <InfoBox>
              <h1>Step 1. Github에서 새 토큰 발급하기</h1>
              <h2>
                Github 바로가기를 클릭해 Github의 개발자 환경설정에 접속한 후,<br />
                <span>Generate new token</span>을 클릭합니다.<br />
                (*Github에 로그인되어있지 않다면 계정에 로그인해주세요.)
              </h2>
            </InfoBox>
            <SvgBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/TH2.svg"} />
            </SvgBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <InfoBox>
              <h1>Step 2. 토큰 정보 설정</h1>
              <h2>
                토큰의 사용기한을 설정한 후, 토큰 사용 범위를 Select scope에서 선택합니다. <br />
                <span>Scope에서 repo를 반드시 선택해주세요!</span>
              </h2>
            </InfoBox>
            <SvgBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/TH3.svg"} />
            </SvgBox>
          </Box>
        </SwiperSlide>
        <SwiperSlide>
          <Box>
            <InfoBox>
              <h1>Step 3. 포그에 Git token 붙여넣기</h1>
              <h2>
                토큰 생성이 완료되었습니다. <br />
                토큰을 복사한 후 포그의 Git token 인증창에 붙여넣기 해주세요.
              </h2>
            </InfoBox>
            <SvgBox>
              <img alt="" src={process.env.PUBLIC_URL + "/img/TH3.svg"} />
            </SvgBox>
            <GoButton>
              <button>
                Git token 인증하러 가기
              </button>
            </GoButton>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Modal>
  );
}


export const FormTextLight = styled(FormText)`
  justify-content: center;
  font-size: 15px;
  font-weight: 100;
  width: auto;
`;

const IconBoxLeft = styled(IconBox)`
  width: 50px;
  margin-left: auto;
  background-color: #1F2029;
`;

const Box = styled.div`
  width: 60%;
  height: 650px;
  margin: 150px auto;
`;

const InfoBox = styled.div`
  width: 100%;
  height: fit-content;
  text-align: center;
  margin-bottom: 40px;
  h1{
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin-bottom: 10px;
  }
  h2{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #FFFFFF;
  }
  span{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 30px;
    text-align: center;
    letter-spacing: -0.01em;
    color: #00C4B4;
  }
`;

const SvgBox = styled.div`
  width: fit-content;
  margin: 0px auto;
`;

const GoButton = styled.div`
  width: fit-content;
  margin: 0px auto;
  text-align: center;
  margin-top: 70px;
  button{
    color: white;
    text-align: center;
    padding: 15px 20px;
    border: 1px solid #00C4B4;
    background: #00C4B4;
    border-radius: 30px;
  }
`;
export default Loading;
