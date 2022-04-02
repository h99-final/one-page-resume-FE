import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
//style
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { LeftMenu, RightMenu, StyledHeader } from "../../shared/Header";
import { ListItemButton, ListItemText } from "../makeporf/shared/SideBar";
//react scroll 라이브러리
import { Link } from "react-scroll";
// redux
import { useSelector } from "react-redux";
import { flexbox } from "@mui/system";
// debounce
import { debounce } from "../../shared/common";
import { apis } from "../../shared/axios";

function PortfolioBaseHeader(props) {
  // 포트폴리오 제작 사이드바에서 불러옴
  // 기본 헤더에서 불러옴
  // 스크롤바를 읽는 nav 바 형식 구현
  const history = useHistory();
  const [info, setInfo] = useState({});
  const [contrastcolor, setContrastcolor] = useState("");
  // ref 로 직접 요소에 접근, props로 받는건데 forwardRef를 써야함?
  const { projectId, refs, id, color, fontcolor, ...scrolldata } = props;

  const url = useRef();
  const copyUrl = (e) => {
    url.current.select();
    document.execCommand("copy");

    setTimeout(() => {
      alert("url이 복사되었습니다.");
    }, 200);
  };

  const defaultScroll = {
    user: scrolldata.user.current?.offsetTop - 150,
    stack: scrolldata.stack.current?.offsetTop - 150,
    career: scrolldata.career.current?.offsetTop - 150,
    project: scrolldata.project.current?.offsetTop - 150,
  };

  const [scroll, setScroll] = useState(0);
  const [selected, setSelected] = useState(1);
  //useEffect를 사용하여 scrollTop의 상태가 변할 때마다 스크롤 이벤트, 함수 실행

  useEffect(() => {
    document.addEventListener("scroll", debounce(handleScroll, 200));
    if (scroll < defaultScroll.user && scroll >= 0) {
      setSelected(1);
    }
    if (scroll >= defaultScroll.user && scroll < defaultScroll.stack) {
      setSelected(2);
    } else if (scroll >= defaultScroll.stack && scroll < defaultScroll.career) {
      setSelected(3);
    } else if (
      scroll >= defaultScroll.career &&
      scroll < defaultScroll.project
    ) {
      setSelected(4);
    } else if (scroll >= defaultScroll.project) {
      setSelected(5);
    }

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const NumBox = () =>
    Array(projectId?.length)
      .fill(0)
      .map((e, i) => (
        <div key={`numberBox-${i}`}>
          <Link to={`${i + 5}`} spy={true} smooth={true} offset={-50}>
            <NumberBox fontcolor={fontcolor}>{i + 1}</NumberBox>
          </Link>
        </div>
      ));

  useEffect(() => {
    apis
      .introPorfGet(id)
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch((errors) => {
        setInfo({ profileImage: "", username: "" });
      });
  }, []);

  useEffect(() => {
    if (fontcolor === "#fff") {
      setContrastcolor("#000");
    } else {
      setContrastcolor("#fff");
    }
  }, []);

  return (
    <>
      <StyledHeaderFix fontcolor={fontcolor}>
        <LeftMenu>
          {fontcolor === "#fff" ? (
            <>
              <img
                onClick={() => {
                  history.push(`/`);
                }}
                style={{ marginRight: "5px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/LogoBefore.svg"}
              />
              <img
                onClick={() => {
                  history.push(`/`);
                }}
                style={{ marginRight: "50px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/LogoAfter.svg"}
              />
            </>
          ) : (
            <>
              <img
                onClick={() => {
                  history.push(`/`);
                }}
                style={{ marginRight: "50px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/logoBlack.svg"}
              />
            </>
          )}
          <Link to="1" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf
              color={color}
              fontcolor={fontcolor}
              contrastcolor={contrastcolor}
              selected={selected === 1 ? true : false}
            >
              <ListItemText>포트폴리오 정보</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="2" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf
              color={color}
              fontcolor={fontcolor}
              contrastcolor={contrastcolor}
              selected={selected === 2 ? true : false}
            >
              <ListItemText>내 정보</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="3" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf
              color={color}
              fontcolor={fontcolor}
              contrastcolor={contrastcolor}
              selected={selected === 3 ? true : false}
            >
              <ListItemText>기술 스택</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="4" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf
              color={color}
              fontcolor={fontcolor}
              contrastcolor={contrastcolor}
              selected={selected === 4 ? true : false}
            >
              <ListItemText>직무 경험</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="5" spy={true} smooth={true} offset={-50}>
            <ListItemButtonPorf
              color={color}
              fontcolor={fontcolor}
              contrastcolor={contrastcolor}
              selected={selected === 5 ? true : false}
            >
              <ListItemText>프로젝트</ListItemText>
            </ListItemButtonPorf>
          </Link>
        </LeftMenu>
        <RightMenu>
          {fontcolor === "#fff" ? (
            <>
              <img
                onClick={() =>
                  alert("준비중입니다. 프로젝트 북마크만 가능합니다.")
                }
                style={{ marginRight: "25px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/BookmarkSimple.svg"}
              />
              <img
                onClick={copyUrl}
                style={{ marginRight: "25px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/copyURLWhite.svg"}
              />
            </>
          ) : (
            <>
              {" "}
              <img
                onClick={() => console.log("bookmarkclicked")}
                style={{ marginRight: "25px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/BookmarkBlack.svg"}
              />
              <img
                onClick={copyUrl}
                style={{ marginRight: "25px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/copyUrlBlack.svg"}
              />
            </>
          )}

          <TextArea readOnly ref={url} value={window.location.href} />
          <Avatar
            alt={info?.username}
            src={info?.profileImage}
            sx={{ width: 38, height: 38 }}
          />
          <Name fontcolor={fontcolor}>{info?.username}</Name>
          <img
            style={{ marginLeft: "30px" }}
            onClick={() => history.goBack()}
            alt="close"
            src={process.env.PUBLIC_URL + "/img/close.svg"}
          />
        </RightMenu>
      </StyledHeaderFix>
      {scroll - defaultScroll.project > -50 ? (
        <>
          <ProjectHeaderFix>
            <ListItemButtonPorf color={color} fontcolor={fontcolor}>
              <ProjectText color={color} fontcolor={fontcolor}>
                Project
              </ProjectText>
            </ListItemButtonPorf>

            <div style={{ display: "flex" }}>
              <NumBox />
            </div>
          </ProjectHeaderFix>
          <hr style={{ margin: "50px" }} />
        </>
      ) : null}
    </>
  );
}

const ProjectHeaderFix = styled.div`
  position: fixed;
  background-color: transparent;
  top: 60px;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  backdrop-filter: blur(2px);
  z-index: 2;
  /* background: rgba(19, 19, 27, 0.5); */
`;

const NumberBox = styled.div`
  color: ${(props) => props.fontcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  font-size: 20px;
  line-height: 24px;
  cursor: pointer;
`;

const ProjectText = styled.div`
  font-family: "Pretendard";
  color: ${(props) => props.fontcolor} !important;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  letter-spacing: -0.01em;
`;

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 2;
`;

const StyledHeaderFix = styled(StyledHeader)`
  position: fixed;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(2px);
  background: ${(props) =>
    props.fontcolor === "#fff"
      ? " rgba(19, 19, 27, 0.8)"
      : "rgba(255, 255, 255, 0.8)"} !important;
`;

const ListItemButtonPorf = styled(ListItemButton)`
  width: 150px;
  background: ${(props) =>
    props.selected ? `${props.color}` : "rgba(255, 255, 255, 0)"};
  border-radius: 10px;
  /* & > span {
    color: ${(props) =>
    props.color === "rgba(0, 0, 0, 0.9)"
      ? "#000"
      : props.selected
      ? `${props.contrastcolor}`
      : `${props.fontcolor}`} !important;
  } */
  & > span {
    color: ${(props) =>
      props.selected
        ? `${props.contrastcolor}`
        : `${props.fontcolor}`} !important;
  }
  cursor: pointer;
`;

const Name = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  color: ${(props) => props.fontcolor};
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PortfolioBaseHeader;
