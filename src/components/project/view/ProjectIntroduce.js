import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// route
import { useParams } from "react-router-dom";
//redux
import { actionCreators } from "../../../redux/modules/setProject";
//apis
import { apis } from "../../../shared/axios";
// components
// import TSPortfolio from "../../portfolio/view/TSPortfolio";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import Spinner from "../../../shared/Spinner";
//markdown
import MDEditor from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";

const ProjectIntroduce = (props) => {
  const { id } = props;

  const [project, setProject] = useState({});
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [is_loading, setIs_loading] = useState(false);

  useEffect(() => {
    // dispatch(actionCreators.setProjectDB(id));
    setIs_loading(true);
    apis
      .projectGet(id)
      .then((res) => {
        setProject(res.data.data);
        setIs_loading(false);
      })
      .catch((error) => {
        window.alert(error.response.data.data.errors[0].message);
      });
    return () => setIs_loading(false);
  }, []);

  // 트러블 슈팅 토글 버튼
  // 트러블 슈팅 api

  return (
    <>
      <TitleBox>
        <h1>{project?.title}</h1>
      </TitleBox>
      <IntroBox>
        <ImgBox>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            // spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {project?.img?.map((e, i) => {
              return (
                <SwiperSlide key={`image-${i}`}>
                  <img style={{ width: "100%", objectFit: "cover" }} alt="" src={e.url} />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Swiper
            onSwiper={setThumbsSwiper}
            // loop={true}
            // spaceBetween={30}
            slidesPerView={project?.img?.length}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper3"
          >
            {is_loading ? (
              <Spinner />
            ) : (
              <ImagePreview>
                {project?.img?.map((e, i) => {
                  return (
                    <SwiperSlide>
                      <img
                        style={{ width: "70px", margin: "0px 10px" }}
                        key={`imagepreveiw-${i}`}
                        alt=""
                        src={e.url}
                      />
                    </SwiperSlide>
                  );
                })}
              </ImagePreview>
            )}
          </Swiper>
        </ImgBox>
        <ContentBox>
          <StackBox>
            <ContentTitle>TECH STACK</ContentTitle>
            {project?.stack?.map((e, i) => {
              return (
                <SubStack key={`e.stack-${i}`}>
                  <span>{e}</span>
                </SubStack>
              );
            })}
          </StackBox>
          <AboutBox>
            <ContentTitle>ABOUT</ContentTitle>
            <MDEditor.Markdown
              style={{
                backgroundColor: "transparent",
                color: "#fff",
                height: "100%",
                minHeight: "600px",
                maxWidth: "100%",
                width: "100%",
                boxSizing: "border-box",
                fontFamily: "Pretendard",
                fontSize: "16px",
                lineHeight: "28px",
              }}
              source={project?.content}
              rehypePlugins={[[rehypeSanitize]]}
            />
          </AboutBox>
        </ContentBox>
      </IntroBox>
    </>
  );
};
const ImagePreview = styled.div`
  display: flex;
  justify-content: center;
  width: 300px;
`;

const AboutBox = styled.div`
  width: 100%;
  min-height: 120px;
  word-wrap: break-word;
  /* h2 {
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
  } */
`;
const SubStack = styled.button`
  width: fit-content;
  background-color: #1f2029;
  height: 40px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 100px;
  border: 1px solid #ffffff;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  margin-right: 15px;
  margin-top: 10px;
  span {
    padding: 0px 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    position: relative;
  }
`;
const ContentTitle = styled.div`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: #555555;
  margin-bottom: 5px;
`;

const StackBox = styled.div`
  width: 100%;
  min-height: 100px;
  margin-bottom: 40px;
`;

const TitleBox = styled.div`
  width: 100%;
  margin: 0px auto;
  margin-top: 100px;
  margin-bottom: 50px;
  justify-content: space-between;
  display: flex;
  text-align: left;
  h1 {
    width: fit-content;
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

const IntroBox = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const ImgBox = styled.div`
  width: 45%;
  height: inherit;
  margin: 0px 2.5%;
`;

const ContentBox = styled.div`
  width: 45%;
  height: 100%;
  justify-content: flex-start;
  margin: 0px 2.5%;
`;
export default ProjectIntroduce;
