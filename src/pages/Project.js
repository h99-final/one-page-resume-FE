import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HorizontalScroll from "../components/project/view/horizontalScroll";
import { actionCreators } from "../redux/modules/setProject";

// import Header from "../shared/Header";
import Introduce from "../components/project/view/ProjectIntroduce";
import TroubleShooting from "../components/project/view/TroubleShooting";
import ProjHeader from "../shared/ProjHeader";
import { apis } from "../shared/axios";
import { Spinner } from "react-bootstrap";

const Project = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [is_loading, setIs_loading] = useState(true);

  const [troubleShootings, setTroubleShootings] = useState();

  useEffect(() => {
    dispatch(actionCreators.setProjectDB(id));
    apis
      .projectTSGet(id)
      .then((res) => setTroubleShootings(res.data.data))
      .then(() => setIs_loading(false));
    dispatch(actionCreators.setTroubleShootingDB(id));
    return setIs_loading(true);
  }, []);

  return (
    <>
      <ProjHeader id={id} />

      <CardsContainer>
        <IntroduceContainer>
          <Introduce id={id} />
        </IntroduceContainer>

        <LeftTopBox style={{ marginBottom: "80px", marginTop: "100px" }}>
          <FontTitle>TroubleShooting</FontTitle>
        </LeftTopBox>

        {is_loading ? (
          <Spinner />
        ) : (
          troubleShootings.map((e, i) => {
            return (
              <TroubleShootingContainer key={i}>
                {e.tsFiles.map((t, i) => {
                  return (
                    <div
                      id={`troubleShooting-${e.commitId}-${i}`}
                      key={`t.fileId=${i}`}
                    >
                      <TroubleShooting
                        color="#000"
                        fontcolor="#fff"
                        key={t.fileId}
                        {...e}
                        {...t}
                        troubleShootingLength={e.tsFiles.length}
                        index={i}
                        linkIndex={e.commitId}
                      />
                    </div>
                  );
                })}
              </TroubleShootingContainer>
            );
          })
        )}
      </CardsContainer>
    </>
  );
};
export const FontTitle = styled.div`
  /* padding: 20px; */
  position: relative;
  height: 100%;
  top: 0;
  font-style: normal;
  font-weight: 400;
  font-size: 25px;
  line-height: 24px;
  letter-spacing: -0.01em;
  color: ${(props) => props.fontcolor};
`;

const LeftTopBox = styled.div`
  height: 4.5vw;
  width: 97%;
  color: white;
`;
const CardsContainer = styled.div`
  /* position: relative; */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* flex-flow: row nowrap; */
  justify-content: flex-start;
  align-items: center;
  color: "#fff";
`;
export const IntroduceContainer = styled.div`
  height: 100%;
  width: 95vw;
  /* background-color: #111f30; */
  flex-shrink: 1;
`;

export const TroubleShootingContainer = styled.div`
  position: relative;
  height: 100%;
  width: 95vw;
  margin: 100px 0px 100px 0px;
  justify-content: space-between;
  /* background-color: #111f30; */
  flex-shrink: 1;
`;

export default Project;
