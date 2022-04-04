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
    padding: "0px",
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
      <InfoBox>
        <IconBoxLeft onClick={closeModal}>
          <img alt="" src={process.env.PUBLIC_URL + "/img/whiteClose.svg"} />
        </IconBoxLeft>
        <img alt="" src={process.env.PUBLIC_URL + "/img/loading.svg"} />
        <h1>Git을 불러오기 위해 열심히 Github를 헤엄치고 있습니다.</h1>
        <h2>Git을 불러오는 동안 포그의 트러블슈팅 작성법을 알려드릴게요.</h2>
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
                <h1>STEP 1. Commit 선택</h1>
                <h2>트러블슈팅을 작성할 파일을 불러오기위해<br />
                  파일이 속한 Commit을 선택해 주세요.</h2>
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
                <h1>STEP 2. Patch Code 선택</h1>
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
                <h1>STEP 3. 트러블 슈팅 작성</h1>
                <h2>불러온 트러블슈팅의 제목과 상세 내용을 적고 <br />
                  저장버튼을 눌러주세요. 저장된 트러블 슈팅은 <br />commit 별로 저장이 됩니다.</h2>
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


export const FormTextLight = styled(FormText)`
  justify-content: center;
  font-size: 15px;
  font-weight: 100;
  width: auto;
`;

const IconBoxLeft = styled(IconBox)`
  width: 50px;
  margin-left: auto;
  background-color: #2C2E39;
  margin-bottom: 50px;
`;

const Box = styled.div`
  display: flex;
  margin: 0px auto;
  width: 80%;
  height: 90%;
`;

const LeftBox = styled.div`
  width: 40%;
  height: 100%;
`;

const StepBox = styled.div`
  width: 350px;
  margin: 70px auto;
  h1{
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
    margin-bottom: 20px;
  }
  h2{
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #FFFFFF;
  }
`;

const RightBox = styled.div`
  width: 60%;
  height: 100%;
`;

const InfoBox = styled.div`
  background-color: #2C2E39;
  width: 100%;
  height: fit-content;
  text-align: center;
  padding-bottom: 90px;
  h1{
    margin-top:30px;
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
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #CFD3E2;
  }
  img{
    width: fit-content;
    margin: 0px auto;
    margin-top: 0px;
  }
`;

const SvgBox = styled.div`
  width: fit-content;
  margin: 70px auto;
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
