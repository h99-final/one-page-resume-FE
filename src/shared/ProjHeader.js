import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../components/loginModal/Modal";
import { Avatar } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { useEffect } from "react";
import { apis } from "./axios";
import { useHistory, useParams } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as bookmarkActions } from "../redux/modules/bookmark";
import { actionCreators as userActions } from "../redux/modules/user";

const ProjHeader = (props) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const { id } = useParams();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const bookmark = useSelector((state) => state.bookmark.myBookmark);

  const history = useHistory();
  const project = useSelector((state) => state.setproject.project);

  const handleDelete = () => {
    apis
      .deleteProject(id)
      .then((res) => {
        history.push(`/project`);
      })
      .catch((errors) => {
        console.log(errors);
        history.push(`/mypage`);
      });
  };

  useEffect(() => {
    apis
      .projectGet(id)
      .then((res) => {
        setInfo(res.data.data);
      })
      .catch(() => {
        setInfo({ username: "" });
      });
  }, []);

  if (!project?.isMyProject) {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <div style={{ marginLeft: "10px", fontSize: "18px" }}>
              {info?.username}
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

            {bookmark.includes(id) ? (
              <img
                onClick={() => dispatch(bookmarkActions.deleteBookmarkDB(id))}
                style={{ marginRight: "25px" }}
                alt="bookmark"
                src={process.env.PUBLIC_URL + "/img/BookmarkGrey.svg"}
              />
            ) : (
              <img
                onClick={() => dispatch(bookmarkActions.addBookmarkDB(id))}
                style={{ marginRight: "25px" }}
                alt="bookmark"
                src={process.env.PUBLIC_URL + "/img/BookmarkSimple.svg"}
              />
            )}

            <img
              onClick={() => history.goBack()}
              alt="close"
              src={process.env.PUBLIC_URL + "/img/close.svg"}
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
            <div
              style={{ marginLeft: "10px", fontSize: "18px" }}
              onClick={() => {
                history.push(`/portfolio/${userInfo.porfId}`);
              }}
            >
              {info?.username}
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
                style={{ marginRight: "35px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/Trash.svg"}
              />
            </div>
            <img
              onClick={() => history.goBack()}
              alt="close"
              src={process.env.PUBLIC_URL + "/img/close.svg"}
            />
          </RightMenu>
        </StyledHeader>
      </>
    );
  }
};

export default ProjHeader;

const StyledHeader = styled.div`
  background: none;
  backdrop-filter: blur(2px);
  align-items: center;
  justify-content: space-between;
  width: 100vw;
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
  margin-right: 16px;
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
