import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
//style
import { Avatar } from "@mui/material";
import styled from "styled-components";
import { LeftMenu, RightMenu, StyledHeader } from "../../shared/Header";
import { ListItemButton, ListItemText } from "../makeporf/shared/SideBar";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";

function PortfolioBaseHeader() {
  // 포트폴리오 제작 사이드바에서 불러옴
  // 기본 헤더에서 불러옴
  // 스크롤바를 읽는 nav 바 형식 구현
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const scroll = useSelector((state) => state.scroll.scroll);
  const history = useHistory();

  const url = useRef();
  const copyUrl = (e) => {
    url.current.select();
    document.execCommand("copy");

    setTimeout(() => {
      alert("url이 복사되었습니다.");
    }, 200);
  };

  console.log(scroll);

  return (
    <>
      <StyledHeaderFix>
        <LeftMenu>
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
          <Link to="1" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf>
              <ListItemText>포트폴리오 정보</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="2" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf>
              <ListItemText>내 정보</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="3" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf>
              <ListItemText>기술 스택</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="4" spy={true} smooth={true} offset={-100}>
            <ListItemButtonPorf>
              <ListItemText>직무 경험</ListItemText>
            </ListItemButtonPorf>
          </Link>
          <Link to="5" spy={true} smooth={true} offset={-50}>
            <ListItemButtonPorf>
              <ListItemText>프로젝트</ListItemText>
            </ListItemButtonPorf>
          </Link>
        </LeftMenu>
        <RightMenu>
          <img
            onClick={() => console.log("bookmarkclicked")}
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
          <TextArea ref={url} value={window.location.href} />
          <Avatar
            alt={userInfo?.name}
            src={userInfo?.profileImage}
            sx={{ width: 38, height: 38 }}
          />
          <Name>{userInfo?.name}</Name>
        </RightMenu>
      </StyledHeaderFix>
    </>
  );
}

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 2;
  backdrop-filter: blur(20px);

  background: rgba(19, 19, 27, 0.8);
`;

const StyledHeaderFix = styled(StyledHeader)`
  position: fixed;
  top: 0;
`;

const ListItemButtonPorf = styled(ListItemButton)`
  width: 150px;
`;

const Name = styled.div`
  margin-left: 10px;
  margin-top: 3px;
  color: #fff;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PortfolioBaseHeader;
