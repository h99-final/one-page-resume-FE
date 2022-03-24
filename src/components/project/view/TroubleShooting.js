import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
//component
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
        <Link
          key={`number-${i}`}
          to={`troubleShooting-${fileId}-${i}`}
          spy={true}
          smooth={true}
          offset={-50}
        >
          <NumberBox onClick={handleNumClick} id={i}>
            {i + 1}
          </NumberBox>
        </Link>
      ));

  // 자동 영역 조절
  const leftBox = useRef(null);
  const rightBox = useRef(null);

  useEffect(() => {
    console.log(rightBox.current.clientHeight);
  });

  return (
    <>
      <SampleCard>
        <LeftBox ref={leftBox}>
          <LeftTopBox>
            <FontTitle>{tsName}</FontTitle>
          </LeftTopBox>
          <LeftBottomBox>{tsContent}</LeftBottomBox>
        </LeftBox>
        <RightBox ref={rightBox}>
          <Num>
            <NumBoxs />
          </Num>
          <Font>{commitMsg}</Font>
          <div>
            <Highlighted show={true} text={tsPatchCodes} />
          </div>
        </RightBox>
      </SampleCard>
    </>
  );
};

const Num = styled.div`
  display: grid;
  grid-template-columns: minmax(0, auto) minmax(0, auto);
  grid-gap: 0;
  flex-direction: row;
  width: calc(45vw);
  border: 1px solid #000;
`;

const SampleCard = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const LeftBox = styled.div`
  width: 45vw;
  display: flex;
  flex-direction: column;
  margin-right: 5vw;
`;

const LeftTopBox = styled.div`
  height: 5vw;
  width: 50vw;
`;

const LeftBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* padding: 20px; */
  min-height: calc(65% - 25px);
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  /* or 175% */

  letter-spacing: -0.01em;

  /* WHITE */

  color: #ffffff;
`;
const RightBox = styled.div`
  /* margin: 0px auto; */
  display: inline-block;
  flex-direction: column;
  height: 100%;
  width: 50vw;
  /* max-width: 800px; */
`;

export const NumberBox = styled.div`
  width: calc(45vw / 10);
  height: calc(45vw / 10);
  background-color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
//   flex-direction: row;
//   flex-wrap: wrap;
//   display: flex;
// `;
export const Font = styled.div`
  padding: 20px;
  position: relative;
  top: 0;
  border: 1px solid #fff;
  /* position: relative; */
  /* flex-direction: row; */
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #ffffff;
`;
export const FontTitle = styled.div`
  /* padding: 20px; */
  position: relative;

  top: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: #ffffff;
`;

export default TroubleShooting;
