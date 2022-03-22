import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Highlighted from "../../makeproject/ts/Highlight";

const TSPortfolio = (props) => {
  const { troubleShootings } = props;
  const { commitId, commitMsg, sha, tsFiles, tsName } = troubleShootings;
  console.log(troubleShootings);

  // const [ts, setTS] = useState([]);
  const [selected, setSelected] = useState(0);

  const handleNumClick = (e) => {
    setSelected(e.target.id);
  };

  const NumBoxs = () =>
    tsFiles.slice(0, 10).length <= 5
      ? Array(tsFiles?.length)
          .fill(0)
          .map((_e, i) => (
            <NumberBox onClick={handleNumClick} id={i} key={`sampleCard-${i}`}>
              {i + 1}
            </NumberBox>
          ))
      : Array(5)
          .fill(0)
          .map((_e, i) => (
            <NumberBox onClick={handleNumClick} id={i} key={`sampleCard-${i}`}>
              {i + 1}
            </NumberBox>
          ));

  const NumBoxs2 = () =>
    Array(tsFiles?.length - 5)
      .fill(0)
      .map((_e, i) => (
        <NumberBox onClick={handleNumClick} id={i} key={`sampleCard-${i}`}>
          {i + 6}
        </NumberBox>
      ));

  return (
    <>
      <SampleCard>
        <LeftBox>
          <LeftTopBox style={{ marginBottom: "24px" }}>
            <Num>
              {tsFiles?.length > 6 ? (
                <>
                  <div style={{ display: "flex" }}>
                    <NumBoxs />
                  </div>
                  <div style={{ display: "flex" }}>
                    <NumBoxs2 />
                  </div>
                </>
              ) : (
                <div style={{ display: "flex" }}>
                  <NumBoxs />
                </div>
              )}
            </Num>

            <>
              <Font>{commitMsg}</Font>
              <Font>{tsName}</Font>
            </>
          </LeftTopBox>
          <LeftBottomBox>{tsFiles.tsContent}</LeftBottomBox>
        </LeftBox>
        <RightBox>
          <Highlighted show text={tsFiles.tsPatchCodes} />
        </RightBox>
      </SampleCard>
    </>
  );
};

const Num = styled.div``;

const SampleCard = styled.div`
  /* position: relative; */
  width: 100vw;
  height: 500vh;
  margin-right: 75px;
  /* flex-shrink: 0; */
  display: flex;
  flex-direction: row;
`;

const LeftBox = styled.div`
  border: 1px solid;
  //ToDo
  min-width: 450px;
  display: flex;
  flex-direction: column;
  margin: 0px 26px;
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
  width: 75vw;
  /* margin: 0px auto; */
  display: flex;
  border: 1px solid #ffffff;
`;
const NumberBox = styled.div`
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

export default TSPortfolio;