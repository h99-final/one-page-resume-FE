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
    if (id === "project") {
      history.push(`/porf`);
      return;
    }
    const index = paramsId.findIndex(isSame);
    history.push(`/write/portfolio/${paramsId[index + 1]}/${porfId}`);
  };

  const handlePreviousClick = () => {
    const index = paramsId.findIndex(isSame);
    history.push(`/write/portfolio/${paramsId[index - 1]}/${porfId}`);
  };

  return (
    <>
      <ButtonBucket>
        <Previous id={id} onClick={handlePreviousClick}>
          <img
            alt=""
            src={process.env.PUBLIC_URL + "/img/leftBox.svg"}
          />
        </Previous>

        {id === "project" ? (
          <Next id={id} onClick={handleNextClick}>
            <img
              alt=""
              src={process.env.PUBLIC_URL + "/img/rightBox.svg"}
            />
          </Next>
        ) : (
          <Next id={id} onClick={handleNextClick}>
            <img
              alt=""
              src={process.env.PUBLIC_URL + "/img/rightBox.svg"}
            />
          </Next>
        )}
      </ButtonBucket>
    </>
  );
}

const Next = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border: 1px solid #999999;
  border-radius: 5px;
  margin-left: ${(props) => (props.id === "introduce" ? "auto" : null)};
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
  display: ${(props) => (props.id === "introduce" ? "none" : null)};
`;

const ButtonBucket = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 60px;
  width: 91%;
  margin: 0px 50px;
`;

export default PreviousNext;
