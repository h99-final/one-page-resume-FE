import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const paramsId = ["introduce", "info", "stack", "career", "project"];

function PreviousNext() {
  const { id } = useParams();
  const history = useHistory();
  const isSame = (e) => e === id;

  const handleNextClick = () => {
    const index = paramsId.findIndex(isSame);
    history.push(`/write/portfolio/${paramsId[index + 1]}/:porfId`);
  };

  const handlePreviousClick = () => {
    const index = paramsId.findIndex(isSame);
    history.push(`/write/portfolio/${paramsId[index - 1]}/:porfId`);
  };

  const handleSubmit = () => {
    console.log("axios 포트폴리오 저장하기");
    // history.push(`/portfolio/:porfId`);
  };

  return (
    <>
      <ButtonBucket>
        {id === "introduce" ? null : (
          <Previous onClick={handlePreviousClick}>
            <span>{`< 이전`}</span>
          </Previous>
        )}
        {id === "project" ? (
          <Next onClick={handleSubmit}>
            <span>{`다음 >`}</span>
          </Next>
        ) : (
          <Next onClick={handleNextClick}>
            <span>{`다음 >`}</span>
          </Next>
        )}
      </ButtonBucket>
    </>
  );
}

const Next = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 62px;
  width: 115px;
  background: #333333;
  border-radius: 43px;
  & > span {
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;
const Previous = styled(Next)`
  float: left;
`;

const ButtonBucket = styled.div`
  display: inline-block;
  height: 60px;
  width: 100%;
`;

export default PreviousNext;
