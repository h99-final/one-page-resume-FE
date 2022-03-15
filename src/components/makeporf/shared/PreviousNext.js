import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const paramsId = ["introduce", "info", "stack", "career", "project"];

function PreviousNext() {
  const { id } = useParams();
  const history = useHistory();
  const isSame = (e) => e === id;

  const { porfId } = useSelector((state) => state.user.user);

  const handleNextClick = () => {
    const index = paramsId.findIndex(isSame);
    history.push(`/write/portfolio/${paramsId[index + 1]}/${porfId}`);
  };

  const handlePreviousClick = () => {
    const index = paramsId.findIndex(isSame);
    history.push(`/write/portfolio/${paramsId[index - 1]}/${porfId}`);
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
            <span>{`<`}</span>
          </Previous>
        )}
        {id === "project" ? (
          <Next onClick={handleSubmit}>
            <span>{`>`}</span>
          </Next>
        ) : (
          <Next onClick={handleNextClick}>
            <span>{`>`}</span>
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
  height: 30px;
  width: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  & > span {
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #999999;
  }
`;
const Previous = styled(Next)`
  float: left;
`;

const ButtonBucket = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  width: 90%;
  margin: 0px auto;
`;

export default PreviousNext;
