import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";

function PreviousNextProject() {
  const history = useHistory();
  const { id, projectId } = useParams();

  const handleNextClick = () => {
    history.push(`troubleshooting/${projectId}`);
  };

  return (
    <>
      <>
        <ButtonBucket>
          <Previous>
            <span>{`<`}</span>
          </Previous>

          {id === "info" ? (
            <Next onClick={handleNextClick}>
              <span>{`>`}</span>
            </Next>
          ) : (
            <Next>
              <span>{`저장하기`}</span>
            </Next>
          )}
        </ButtonBucket>
      </>
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

export default PreviousNextProject;
