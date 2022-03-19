import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";

const NotFound = () => {
  const history = useHistory();

  return (
    <>
      <Container>
        <NotFoundBtn>
          <h1>! 올바르지 못한 접근입니다 !</h1>
          <button onClick={() => { history.goBack() }}>이전화면으로 돌아가기</button>
        </NotFoundBtn>
      </Container>
    </>
  );
};

export default NotFound;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
`;

const NotFoundBtn = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 150px;
  border: 1px solid white;
  text-align: center;
  h1{
    margin: 25px 0px;
    color: white;
  }
  button{
    padding: 15px 20px;
    border: 1px solid #696B7B;
    border-radius: 10px;
    background-color: #696B7B;
    color: white;
  }
`

