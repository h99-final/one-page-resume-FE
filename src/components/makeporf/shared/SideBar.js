import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function SideBar() {
  const history = useHistory();
  return (
    <>
      <List>
        <ListInside>
          <ListItemButton
            onClick={() => history.push("/write/portfolio/introduce/:porfid")}
          >
            <ListItemText>포트폴리오 정보</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => history.push("/write/portfolio/info/:porfid")}
          >
            <ListItemText>포트폴리오 정보</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => history.push("/write/portfolio/stack/:porfid")}
          >
            <ListItemText>포트폴리오 정보</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => history.push("/write/portfolio/career/:porfid")}
          >
            <ListItemText>포트폴리오 정보</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => history.push("/write/portfolio/project/:porfid")}
          >
            <ListItemText>포트폴리오 정보</ListItemText>
          </ListItemButton>
        </ListInside>
      </List>
    </>
  );
}

const List = styled.div`
  position: relative;
  width: 1440px;
  height: 70px;
  left: 0px;
  top: 0px;

  background: #ededed;
  border-radius: 10px;

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 15px 0px;
`;

const ListInside = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  padding: 0px;

  position: absolute;
  width: 900px;
  height: 50px;
  left: 10px;
  top: 10px;
`;

const ListItemButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: static;
  width: 180px;
  height: 50px;

  background: #333333;
  border-radius: 10px;
`;

const ListItemText = styled.div`
  position: static;
  width: 100px;
  height: 19px;
  left: 40px;
  top: 15.5px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  /* C6 */

  color: #ffffff;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
`;

export default SideBar;
