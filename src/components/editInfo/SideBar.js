import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

function SideBar() {
  const history = useHistory();
  const { id } = useParams();
  const { userId } = JSON.parse(sessionStorage.getItem("userInfo"));

  console.log(userId)
  return (
    <>
      <List>
        <ListInside>
          <ListItemButton
            selected={id === "changeinfo" ? true : false}
            onClick={() => history.push(`/editinfo/changeinfo/${userId}`)}
          >
            <ListItemText>기본 정보</ListItemText>
          </ListItemButton>
          <ListItemButton
            selected={id === "mainstack" ? true : false}
            onClick={() => history.push(`/editinfo/mainstack/${userId}`)}
          >
            <ListItemText>대표 스택</ListItemText>
          </ListItemButton>
          <ListItemButton
            selected={id === "editpwd" ? true : false}
            onClick={() => history.push(`/editinfo/editpwd/${userId}`)}
          >
            <ListItemText>비밀번호 관리</ListItemText>
          </ListItemButton>
        </ListInside>
      </List>
    </>
  );
}

const List = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  left: 0px;
  top: 0px;
  background: #2C2E39;
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
    props.selected ? "#424453" : "rgba(255, 255, 255, 0)"};
  border-radius: 10px;
  & > span {
    color: ${(props) => (props.selected ? "white" : "white")};
  }
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
