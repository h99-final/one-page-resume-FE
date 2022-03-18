import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function SideBar() {
  const history = useHistory();
  const { id } = useParams();
  const { porfId } = useSelector((state) => state.user.user);
  return (
    <>
      <List>
        <ListInside>
          <ListItemButton
            selected={id === "introduce" ? true : false}
            onClick={() => history.push(`/write/portfolio/introduce/${porfId}`)}
          >
            <ListItemText>포트폴리오 정보</ListItemText>
          </ListItemButton>
          <ListItemButton
            selected={id === "info" ? true : false}
            onClick={() => history.push(`/write/portfolio/info/${porfId}`)}
          >
            <ListItemText>내 소개</ListItemText>
          </ListItemButton>
          <ListItemButton
            selected={id === "stack" ? true : false}
            onClick={() => history.push(`/write/portfolio/stack/${porfId}`)}
          >
            <ListItemText>기술 스택</ListItemText>
          </ListItemButton>
          <ListItemButton
            selected={id === "career" ? true : false}
            onClick={() => history.push(`/write/portfolio/career/${porfId}`)}
          >
            <ListItemText>직무 경험</ListItemText>
          </ListItemButton>
          <ListItemButton
            selected={id === "project" ? true : false}
            onClick={() => history.push(`/write/portfolio/project/${porfId}`)}
          >
            <ListItemText>프로젝트</ListItemText>
          </ListItemButton>
        </ListInside>
      </List>
    </>
  );
}

const List = styled.div`
  display: flex;
  /* position: relative; */
  width: 100%;
  height: 70px;
  left: 0px;
  top: 0px;

  background: #ededed;
  border-radius: 10px;

  flex: none;
  margin: 15px 0px;
`;

const ListInside = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 100%;
  height: 50px;
  margin: auto 10px;
`;

const ListItemButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 180px;
  height: 50px;

  background: ${(props) =>
    props.selected ? "#333333" : "rgba(255, 255, 255, 0)"};
  border-radius: 10px;
  & > span {
    color: ${(props) => (props.selected ? "white" : "#333333")};
  }
  cursor: pointer;
`;

const ListItemText = styled.span`
  width: auto;
  height: 19px;
  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
`;

export default SideBar;
