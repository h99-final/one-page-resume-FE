import React, { useRef, useState } from "react";
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
import DeleteModal from './DeleteModal';

const ProjHeader = (props) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const { id } = useParams();
  const dispatch = useDispatch();
  const [info, setInfo] = useState({});
  const bookmark = useSelector((state) => state.bookmark.myBookmark);

  const history = useHistory();
  const project = useSelector((state) => state.setproject.project);

  const [modalOpen, setModalOpen] = useState(false);

  const exitClose = () => {
    setModalOpen(false);
  };

  const handleDelete = () => {
    apis
      .deleteProject(id)
      .then((res) => {
        history.push(`/project`);
      })
      .catch((errors) => {

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

  const url = useRef();

  const copyUrl = (e) => {
    url.current.select();
    document.execCommand("copy");

    setTimeout(() => {
      alert("url이 복사되었습니다.");
    }, 200);
  };

  if (!project?.isMyProject) {
    return (
      <>
        <StyledHeader>
          <LeftMenu>
            <img
              onClick={() => {
                history.push(`/`);
              }}
              style={{ marginRight: "5px", marginLeft: "30px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoBefore.svg"}
            />
            <img
              onClick={() => {
                history.push(`/`);
              }}
              style={{ marginRight: "5px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoAfter.svg"}
            />
          </LeftMenu>
          <RightMenu>
            <div style={{ marginRight: "16px", fontSize: "16px" }}>
              {info?.username}
            </div>
            <a href={info.gitRepoUrl} target="_blank" style={{ textDecoration: "none" }}>
              <SharedBtn>
                <img
                  style={{ marginRight: "7px" }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/link.svg"}
                />
                GitHub
              </SharedBtn>
            </a>
            <TextArea readOnly ref={url} value={window.location.href} />
            <a href={info.gitRepoUrl} target="_blank" style={{ textDecoration: "none" }}>

              <img
                style={{ marginRight: "16px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/star.svg"}
              />
            </a>
            {bookmark.includes(id) ? (
              <img
                onClick={() => dispatch(bookmarkActions.deleteBookmarkDB(id))}
                style={{ marginRight: "39px" }}
                alt="bookmark"
                src={process.env.PUBLIC_URL + "/img/BookmarkGrey.svg"}
              />
            ) : (
              <img
                onClick={() => dispatch(bookmarkActions.addBookmarkDB(id))}
                style={{ marginRight: "41px" }}
                alt="bookmark"
                src={process.env.PUBLIC_URL + "/img/BookmarkSimple.svg"}
              />
            )}

            <img
              style={{ marginRight: "20px" }}
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
            <img
              onClick={() => {
                history.push(`/`);
              }}
              style={{ marginRight: "5px", marginLeft: "30px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoBefore.svg"}
            />
            <img
              onClick={() => {
                history.push(`/`);
              }}
              style={{ marginRight: "5px" }}
              alt=""
              src={process.env.PUBLIC_URL + "/img/LogoAfter.svg"}
            />
          </LeftMenu>
          <RightMenu>

            <div
              style={{ marginRight: "16px", fontSize: "16px" }}
              onClick={() => {
                history.push(`/portfolio/${userInfo.porfId}`);
              }}
            >
              {info?.username}
            </div>
            <a href={info.gitRepoUrl} target="_blank" style={{ textDecoration: "none" }}>
              <SharedBtn>
                <img
                  style={{ marginRight: "7px" }}
                  alt=""
                  src={process.env.PUBLIC_URL + "/img/link.svg"}
                />
                GitHub
              </SharedBtn>
            </a>

            <div onClick={() => history.push(`/write/project/info/${id}`)}>
              <img
                style={{ marginRight: "16px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/pencil.svg"}
              />
            </div>

            <div onClick={() => { setModalOpen(true) }}>
              <img
                style={{ marginRight: "40px" }}
                alt=""
                src={process.env.PUBLIC_URL + "/img/Trash.svg"}
              />
            </div>
            <img
              onClick={() => history.goBack()}
              style={{ marginRight: "20px" }}
              alt="close"
              src={process.env.PUBLIC_URL + "/img/close.svg"}
            />
          </RightMenu>
        </StyledHeader>
        {modalOpen && (
          <DeleteModal exitClose={exitClose}></DeleteModal>
        )}
      </>
    );
  }
};

export default ProjHeader;

const StyledHeader = styled.div`
  background: rgba(19, 19, 27, 0.8);
  backdrop-filter: blur(5px);
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

const TextArea = styled.textarea`
  position: absolute;
  width: 0px;
  height: 0px;
  bottom: 0;
  left: 0;
  opacity: 0;
  z-index: 2;
`;
const RightMenu = styled.div`
  display: flex;
  align-items: center;
  color: white;
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
  justify-content: center;
  align-items: center;
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
