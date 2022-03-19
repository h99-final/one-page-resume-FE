import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/loginModal/Modal";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useEffect } from "react";
import { apis } from "./axios";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";
import { useHistory, useParams } from "react-router-dom";

const ProjHeader = (props) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const { id } = useParams();
  // const userInfo = useSelector((state) => state.user.user);

  const history = useHistory();
  const project = useSelector((state) => state.setproject.project);

  const handleDelete = () => {
    apis
      .deleteProject(id)
      .then((res) => {
        console.log(res.data.data);
        history.push(`/project`);
      })
      .catch((errors) => {
        console.log(errors);
        history.push(`/mypage`);
      });
  };

  if (!project.isMyProject) {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <Avatar
              alt={userInfo.name}
              src={userInfo.profileImage}
              sx={{ width: 38, height: 38, marginLeft: "25px" }}
            />
            <div
              style={{ marginLeft: "10px", fontSize: "18px" }}
              onClick={() => {
                history.push(`/portfolio/${userInfo.porfId}`);
              }}
            >
              {userInfo.name}
            </div>
          </LeftMenu>
          <RightMenu>
            <SharedBtn>
              <img
                style={{ marginRight: "7px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/link.svg"}
              />
              GitHub
            </SharedBtn>

            <img
              style={{ marginRight: "16px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/star.svg"}
            />

            <img
              style={{ marginRight: "25px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/BookmarkSimple.svg"}
            />
          </RightMenu>
        </StyledHeader>
      </>
    );
  } else {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <Avatar
              onClick={() => {
                history.push("/");
              }}
              alt={userInfo.name}
              src={userInfo.profileImage}
              sx={{ width: 38, height: 38, marginLeft: "25px" }}
            />
            <div
              style={{ marginLeft: "10px", fontSize: "18px" }}
              onClick={() => {
                history.push(`/portfolio/${userInfo.porfId}`);
              }}
            >
              {userInfo.name}
            </div>
          </LeftMenu>
          <RightMenu>
            <SharedBtn>
              <img
                style={{ marginRight: "7px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/link.svg"}
              />
              GitHub
            </SharedBtn>

            <div onClick={() => history.push(`/write/project/info/${id}`)}>
              <img
                style={{ marginRight: "16px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/pencil.svg"}
              />
            </div>

            <div onClick={handleDelete}>
              <img
                style={{ marginRight: "25px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/Trash.svg"}
              />
            </div>
          </RightMenu>
        </StyledHeader>
      </>
    );
  }
};

export default ProjHeader;

const StyledHeader = styled.div`
  background-color: #13131b;
  align-items: center;
  justify-content: space-between;
  width: 97vw;
  height: 60px;
  margin-left: auto;
  margin-right: auto;
  position: fixed;
  display: flex;
  top: 0;
  z-index: 9;
`;

const LeftMenu = styled.div`
  display: flex;
  color: white;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
  cursor: pointer;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
  font-weight: 500;
  cursor: pointer;
`;

const SharedBtn = styled.button`
  cursor: pointer;
  background-color: black;
  display: flex;
  padding: 10px 20px;
  text-align: center;
  color: #ffffff;
  border-radius: 24px;
  font-size: 17px;
  border: none;
  margin-right: 16px;
  cursor: pointer;
`;

const WriteBtn = styled.button`
  cursor: pointer;
  background-color: black;
  width: 130px;
  height: 40px;
  color: white;
  border-radius: 25px;
  font-size: 17px;
  padding: 5px 10px 5px 10px;
  border: none;
`;
