import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { apis } from "../../../shared/axios";
import { useParams } from "react-router-dom";
import { actionCreators } from "../../../redux/modules/setProject";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProjHeader from "../../../shared/ProjHeader";
import { Title } from "../../../pages/MyPage";
import Highlighted from "../../makeproject/ts/Highlight";

const TroubleShooting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // const [ts, setTS] = useState([]);
  const [selected, setSelected] = useState(0);

  const handleNumClick = (e) => {
    setSelected(e.target.id);
    console.log(e.target.id);
  };

  useEffect(() => {
    dispatch(actionCreators.setTroubleShootingDB(id));
  }, []);

  const troubleShootings = useSelector(
    (state) => state.setproject.project.troubleShootings
  );
  const ts = useSelector((state) => state.setproject.troubleShootings);
  const is_loading = useSelector((state) => state.setproject.is_loading);
  console.log(troubleShootings, ts);

  const NumBoxs = () =>
    ts.length <= 5
      ? Array(ts?.length)
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
    Array(ts?.length - 5)
      .fill(0)
      .map((_e, i) => (
        <NumberBox onClick={handleNumClick} id={i} key={`sampleCard-${i}`}>
          {i + 6}
        </NumberBox>
      ));

  return (
    <>
      {is_loading ? (
        <>로딩중</>
      ) : (
        <SampleCard>
          <LeftBox>
            <LeftTopBox style={{ marginBottom: "24px" }}>
              <Num>
                {ts?.length > 6 ? (
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
              <Font>{troubleShootings[0]?.commitMsg}</Font>
              <Font>{troubleShootings[0]?.tsName}</Font>
            </LeftTopBox>
            <LeftBottomBox>{ts[0]?.tsContent}</LeftBottomBox>
          </LeftBox>
          <RightBox>
            <Highlighted text={ts[0].tsPatchCodes} />
          </RightBox>
        </SampleCard>
      )}
      )
    </>
  );
};

const Num = styled.div``;

const SampleCard = styled.div`
  position: relative;
  width: 1440px;
  height: 88vh;
  margin-right: 75px;
  flex-shrink: 0;
  border: 1px solid;
  display: flex;
  justify-content: flex-start;
`;

const LeftBox = styled.div`
  border: 1px solid;
  //ToDo
  width: 338px;
  display: flex;
  flex-direction: column;
  margin: 0px 26px;
  /* border: 1px solid #ffffff; */
`;
const LeftTopBox = styled.div`
  min-height: calc(35% - 20px);
  border: 1px solid #ffffff;
`;
const LeftBottomBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  min-height: calc(65% - 50px);
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
  width: 295px !important;
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
