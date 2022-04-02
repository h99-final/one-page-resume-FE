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
    <BottomNav>
      <ButtonBucket>
        {page === 1 ? (
          <Previous onClick={handlePreviousClick}>
            <span>이전으로</span>
          </Previous>
        ) : null}
        {page === 1 ? (
          <Next onClick={handleSubmit}>
            <span>{`불러오기`}</span>
          </Next>
        ) : (
          <Next onClick={handleNextClick}>
            <span>다음으로</span>
          </Next>
        )}
      </ButtonBucket>
    </BottomNav>
  );
}
const BottomNav = styled.div`
  display: fixed;
  position: fixed;
  align-items: center;
  flex-direction: row;
  justify-content: ${(props) =>
    props.id === "info" ? "flex-end" : "space-between"};
  left: 0;
  width: 100%;
  height: 70px;
  /* margin-top: 50px; */
  margin: auto;
  bottom: 0px;
  background: #393a47;
  border-radius: 10px;
`;
const Next = styled.div`
  float: right;
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
  height: 55px;
  width: 115px;
  padding: 0px 10px;
  background: #00c4b4;
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
  cursor: pointer;
`;
const Previous = styled(Next)`
  cursor: pointer;

  float: left;
`;

const ButtonBucket = styled.div`
  position: block;
  height: 60px;
  width: 98%;
  margin: 0px auto;
`;

export default PreviousNextProject;
