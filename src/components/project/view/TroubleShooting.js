import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Highlighted from "../../makeproject/ts/Highlight";

const TroubleShooting = (props) => {
  const {
    fileId,
    fileName,
    tsContent,
    tsPatchCodes,
    tsName,
    commitMsg,
    tsLength,
  } = props;
  console.log(props);
  const { id } = props;

  // const [ts, setTS] = useState([]);
  const [selected, setSelected] = useState(0);

  const handleNumClick = (e) => {
    setSelected(e.target.id);
  };

  // 번호칸 만들기
  const NumBoxs = () =>
    Array(tsLength)
      .fill(0)
      .map((_e, i) => (
        <NumberBox onClick={handleNumClick} id={i} key={`sampleCard-${i}`}>
          {i + 1}
        </NumberBox>
      ));

  return (
    <>
      <SampleCard>
        <LeftBox>
          <LeftTopBox style={{ marginBottom: "24px" }}>
            <Num>
              <NumBoxs />
            </Num>

            <Font>{commitMsg}</Font>
            <Font>{tsName}</Font>
          </LeftTopBox>
          <LeftBottomBox>{tsContent}</LeftBottomBox>
        </LeftBox>
        <RightBox>
          <Highlighted show text={tsPatchCodes} />
        </RightBox>
      </SampleCard>
    </>
  );
};

const Num = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 650px;
  justify-content: space-between;
`;

const SampleCard = styled.div`
  /* position: relative; */
  width: 100%;
  height: calc(100vh - 120px);
  margin: 60px auto;
  /* flex-shrink: 0; */
  display: flex;
  flex-direction: row;
`;

const LeftBox = styled.div`
  border: 1px solid;
  max-width: 650px;
  display: flex;
  flex-direction: column;
  margin-right: 70px;
  /* border: 1px solid #ffffff; */
`;

const LeftTopBox = styled.div`
  max-height: calc(35% - 20px);
  border: 1px solid #ffffff;
`;

const LeftBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  min-height: calc(65% - 25px);
  border: 1px solid #ffffff;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* or 175% */

  letter-spacing: -0.01em;

  /* WHITE */

  color: #ffffff;
`;
const RightBox = styled.div`
  border: 1px solid;

  /* margin: 0px auto; */
  display: flex;
  width: calc(95vw - 650px);
  max-width: 800px;
  border: 1px solid #ffffff;
`;

export const NumberBox = styled.div`
  width: 65px;
  height: 65px;
  background-color: white;
  border: 1px solid black;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    padding: 18px 0px;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
  }
`;
// const Left = styled.div`
//   width: 325px;
//   height: 100%;
//   margin-right: 25px;
// `;

// const Number = styled.div`
//   width: 100%;
//   border: 1px solid black;
//   flex-direction: row;
//   flex-wrap: wrap;
//   display: flex;
// `;
export const Font = styled.div`
  padding: 20px;
  position: relative;
  top: 0;

  /* position: relative; */
  /* flex-direction: row; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #ffffff;
  border: 1px solid #ffffff;
`;

const File = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-bottom: 25px;
  flex-direction: row;
  word-wrap: break-word;
  white-space: -moz-pre-wrap;
  white-space: pre-wrap;
  h1 {
    padding: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 520px;
  border: 1px solid black;
  h1 {
    padding: 20px;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;

const Right = styled.div`
  width: 73%;
  border: 1px solid;
`;

export default TroubleShooting;
