import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { actionCreators } from "../../redux/modules/patchcode";

function PreviousNextProject(props) {
  const dispatch = useDispatch();

  const { selectedSha, setPage, page, selectedFileName, closeModal } = props;

  const handlePreviousClick = () => {
    if (page === 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNextClick = () => {
    if (page === 0) {
      if (selectedSha !== null) {
        setPage((prev) => prev + 1);
      }
    }
  };

  // 여기서 디스패치 하는게 맞나?
  // 가져온 파일이름 setpatchcode 해서
  const handleSubmit = () => {
    dispatch(actionCreators.selectPatchCode(selectedFileName));
    closeModal();
  };

  return (
    <>
      <ButtonBucket>
        {page === 1 ? (
          <Previous onClick={handlePreviousClick}>
            <span>{`< 이전`}</span>
          </Previous>
        ) : null}
        {page === 1 ? (
          <Next onClick={handleSubmit}>
            <span>{`불러오기`}</span>
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
  margin-top: 50px;
  position: block;
  height: 60px;
  width: 100%;
`;

export default PreviousNextProject;
