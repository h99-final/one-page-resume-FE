import React, { useEffect, useState } from "react";
//style
import styled from "styled-components";
import { Inner } from "../makeporf/shared/_sharedStyle";
import { Font } from "../makeporf/view/Introduce";
import { useHistory } from "react-router-dom";
//redux
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "../../redux/modules/bookmark";
function MainCard(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const bookmark = useSelector((state) => state.bookmark.myBookmark);
  const {
    id,
    title,
    stack,
    content,
    bookmarkCount,
    imageUrl,
    username,
    userJob,
  } = props;

  const handleClick = () => {
    history.push(`/project/${id}`);
  };

  const handleDeleteBookmark = (e) => {
    e.preventDefault();
    dispatch(actionCreators.deleteBookmarkDB(id));
  };
  const handleAddBookmark = (e) => {
    e.preventDefault();
    dispatch(actionCreators.addBookmarkDB(id));
  };

  return (
    <>
      <ProjectForm onClick={handleClick}>
        <InnerCard src={imageUrl} />

        <ProjectStacks>
          {/* 스택의 길이가 3보다 길때 잘라서 보여줌 */}
          {stack.length > 3
            ? stack.slice(0, 3).map((e, i) => {
                return <ProjectStack key={`stack-${i}`}>#{e}</ProjectStack>;
              })
            : stack.map((e, i) => {
                return <ProjectStack key={`stack-${i}`}>#{e}</ProjectStack>;
              })}
          {stack.length > 3 && (
            <ProjectStack
              style={{
                backgroundColor: "#393A47",
                color: "#666982",
                border: "1px solid #666982",
              }}
            >
              + {stack.length - 3}
            </ProjectStack>
          )}
        </ProjectStacks>
        <ProjectTitle>
          <h1>{title}</h1>
          <h2>
            {content?.length < 68 ? content : content.slice(0, 68) + `...`}
          </h2>
        </ProjectTitle>

        {id !== "project" && (
          <ProjectOwner>
            <h1>{username}</h1>
            <h2>{userJob}</h2>
          </ProjectOwner>
        )}
        <Footer>
          <h1>
            {bookmark?.includes(`${id}`) ? (
              <img
                onClick={handleDeleteBookmark}
                alt=""
                src={process.env.PUBLIC_URL + "/img/BookmarkGrey.svg"}
              />
            ) : (
              <img
                onClick={handleAddBookmark}
                alt=""
                src={process.env.PUBLIC_URL + "/img/BookmarkSimple.svg"}
              />
            )}
            {bookmarkCount}
          </h1>
        </Footer>
      </ProjectForm>
    </>
  );
}

const Footer = styled.div`
  width: 100%;
  height: 59px;
  border-top: 1px solid #666982;
  display: flex;
  justify-content: right;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    display: flex;
    align-items: center;
    margin-right: 20px;
    letter-spacing: -0.01em;
    color: #cfd3e2;
  }
  img {
    margin-right: 5px;
  }
`;

const ProjectOwner = styled.div`
  width: 90%;
  margin: 0px auto;
  display: flex;
  margin-bottom: 20px;
  h1 {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #cfd3e2;
  }

  h2 {
    margin-left: 10px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #cfd3e2;
  }
`;

const InnerCard = styled.img`
  width: 100%;
  height: 235px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: url("{imageUrl}");
  @media only screen and (max-width: 1377px) {
    width: 100%;
  }

  @media only screen and (max-width: 1037px) {
  }
`;

export const ProjectForm = styled.div`
  width: 31.9%;

  margin: 0% 0.7%;
  background-color: #393a47;
  max-height: 515px;
  border-radius: 10px;
  border: ${(props) =>
    props.selected ? "1px solid blue;" : "1px solid #393A47;"};
  box-sizing: border-box;
  margin-bottom: 30px;
  @media only screen and (max-width: 1377px) {
    width: 48%;
  }

  @media only screen and (max-width: 1039px) {
    width: 99%;
  }
  &:hover {
    background-color: #424453;
    transition: 0.2s ease-in-out;
  }
`;

const ProjectStacks = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ProjectStack = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  padding: 5px 15px;
  width: fit-content;
  height: 25px;
  border-radius: 5px;
  color: white;
  background-color: #666982;
`;

const ProjectTitle = styled.div`
  justify-content: flex-start;
  width: 90%;
  height: 75px;
  margin: 10px auto;
  margin-bottom: 25px;
  h1 {
    width: 100%;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: white;
    margin-bottom: 10px;
  }
  h2 {
    word-wrap: break-word;
    width: 100%;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: white;
  }
`;

export default MainCard;
