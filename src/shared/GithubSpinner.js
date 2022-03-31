import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  FormText,
  IconBox,
} from "../components/makeporf/shared/_sharedStyle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/banner.css";
import Spinner from './Spinner';
import { animated, useSpring, config } from "react-spring";

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

function GithubSpinner(props) {
  const { totalCommitCount, curCommitCount } = props;
  const dispatch = useDispatch();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const { helpModalOpen, setHelpModalOpen } = props;

  const [progress, setProgress] = useState("0%");

  const style = useSpring({ width: progress, config: config.slow });

  function closeModal() {
    setHelpModalOpen(false);
  }

  useEffect(() => {
    setProgress(Math.round(curCommitCount / totalCommitCount * 100))
  }, [curCommitCount])

  // Modal.setAppElement("#root");

  return (
    <Container
    // ariaHideApp={false}
    // isOpen={helpModalOpen}
    // onRequestClose={closeModal}
    // style={customStyles}
    // contentLabel="Example Modal"
    >
      <InfoBox>
        {/* <img alt="" src={process.env.PUBLIC_URL + "/img/loading.svg"} /> */}

        {/* <div style={{ width: "350px", margin: "0px auto" }}><Spinner /></div> */}
        <h1>Git을 불러오기 위해 열심히 Github를 헤엄치고 있습니다.</h1>
        <h2>Git을 불러오는 동안 포그의 트러블슈팅 작성법을 알려드릴게요.</h2>
        <ProgressBar><animated.span style={style} /></ProgressBar>
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
    </Container>
  );
}
const Container = styled.div`
  background-color: #1F2029;
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
  padding-top: 30px;
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
    margin-bottom: 30px;
  }
  img{
    width: fit-content;
    margin: 0px auto;
    margin-top: 0px;
  }
`;
const ProgressBar = styled.div`
  /* height: 20px; */
  margin: 0px auto;
  position: relative;
  background: #d9dce5;
  /* -moz-border-radius: 25px;
  -webkit-border-radius: 25px; */
  /* border-radius: 25px; */
  padding: 10px;
  width: 80vw;
  span{
    display: block;
  height: 100%;
  /* border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px; */
  background-color: #a140ff;
  /* background-image: linear-gradient(to bottom, #7dc9df, #a140ff); */
  position: relative;
  overflow: hidden;
  }
`;


const SvgBox = styled.div`
  width: fit-content;
  margin: 70px auto;
`;

export default GithubSpinner;
