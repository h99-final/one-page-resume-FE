import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../components/banner.css";
import { animated, useSpring, config } from "react-spring";

function GithubSpinner(props) {
  const { totalCommitCount, curCommitCount } = props;

  const [progress, setProgress] = useState("0%");

  const style = useSpring({ width: progress, config: config.slow });

  useEffect(() => {
    setProgress(Math.round((curCommitCount / totalCommitCount) * 100) + "%");
  }, [curCommitCount]);

  // Modal.setAppElement("#root");

  return (
    <Container>
      <InfoBox>
        <h1>Git을 불러오기 위해 열심히 Github를 헤엄치고 있습니다.</h1>
        <h2>Git을 불러오는 동안 포그의 트러블슈팅 작성법을 알려드릴게요.</h2>
        <ProgressBar>
          <animated.span style={style}></animated.span>
        </ProgressBar>
        <h2>
          Commit을 불러오는중... ({curCommitCount}/{totalCommitCount})
        </h2>
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
    </Container>
  );
}
const Container = styled.div`
  background-color: #1f2029;
  width: 100%;
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  margin: 0px auto;
  width: 70%;
`;

const LeftBox = styled.div`
  width: 40%;
  height: fit-content;
`;

const StepBox = styled.div`
  width: fit-content;
  margin: 40px auto;
  margin-right: 20px;
  h1 {
    font-style: normal;
    font-weight: 600;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: -0.01em;
    color: #00c4b4;
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
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    letter-spacing: -0.01em;
    color: #00c4b4;
  }
`;

const RightBox = styled.div`
  width: 60%;
  height: fit-content;
`;

const InfoBox = styled.div`
  background-color: #2c2e39;
  width: 100%;
  height: fit-content;
  text-align: center;
  padding-bottom: 30px;
  h1 {
    margin-top: 20px;
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 34px;
    letter-spacing: -0.01em;
    color: #ffffff;
    margin-bottom: 5px;
  }
  h2 {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #cfd3e2;
    margin-bottom: 10px;
  }
  img {
    width: fit-content;
    margin: 0px auto;
    margin-top: 0px;
  }
`;
const ProgressBar = styled.div`
  height: 10px; /* Can be anything */
  margin: 0px auto;
  margin-bottom: 5px;
  position: relative;
  background: #d9dce5;
  -moz-border-radius: 25px;
  -webkit-border-radius: 25px;
  border-radius: 25px;
  padding: 0px;
  width: 50%;
  span {
    display: block;
    height: 100%;
    background-color: #00c4b4;
    border-radius: 25px;
    position: relative;
    overflow: hidden;
  }
`;

const SvgBox = styled.div`
  width: fit-content;
  margin: 40px auto;
  margin-bottom: 30px;
`;

export default GithubSpinner;
