import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { apis } from './axios';

const DeleteModal = ({ exitClose }) => {
  const history = useHistory();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const { id } = useParams();

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

  const handleClickShow = () => {
    let show = true;
    apis.porfShow(show).then((res) => {
      history.push(`/portfolio/${userInfo.porfId}`);
    });
  };
  const handleClickNoShow = () => {
    let show = false;
    apis.porfShow(show).then((res) => {
      history.push("/mypage");
    });
  };

  return (
    <ModalBG>
      <ModalBox>
        <div
          style={{
            position: "fixed",
            top: "3%",
            right: "2%",
          }}
        >
          <button
            style={{
              float: "right",
              backgroundColor: "inherit",
              border: "none",
            }}
            onClick={exitClose}
          >
            <img alt="" src={process.env.PUBLIC_URL + "/img/close.svg"} />
          </button>
        </div>
        <TextContainer>
          <h1>정말 삭제하시겠습니까?</h1>
          <p>삭제한 프로젝트는 되돌릴 수 없습니다.</p>
        </TextContainer>
        <BtnBox>
          <Btn2 onClick={exitClose}>아니요</Btn2>
          <Btn onClick={handleDelete}>네</Btn>
        </BtnBox>
      </ModalBox>
    </ModalBG>
  );
};

export default DeleteModal;

const ModalBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
`;

const ModalBox = styled.div`
  border-radius: 10px;
  width: 628px;
  height: 366px;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #2c2e39;
  color: white;
`;
const BtnBox = styled.div`
  width: fit-content;
  margin: 0px auto;
  margin-top: 20px;
`;

const Btn = styled.button`
  cursor: pointer;
  width: 180px;
  height: 52px;
  border-radius: 30px;
  font-size: 14px;
  padding: 10px 20px;
  margin-top: 5px;
  border: none;
  color: white;
  background-color: #8a1616;
  margin-left: 20px;
  /* :hover{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), #00C4B4;
  } */
`;
const Btn2 = styled.button`
  cursor: pointer;
  margin-right: 20px;
  width: 180px;
  height: 52px;
  border-radius: 35px;
  font-size: 14px;
  padding: 10px 20px;
  border-radius: 30px;
  border: none;
  color: white;
  background-color: #00c4b4;
  /* :hover{
    background-color: #696B7B;
  } */
`;

const TextContainer = styled.div`
  width: 408px;
  height: 100px;
  margin: 0px auto;
  margin-top: 65px;
  margin-bottom: 80px;
  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 20px;
  }
  p {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: #cfd3e2;
    line-height: 24px;
    font-weight: 400;
  }
`;
