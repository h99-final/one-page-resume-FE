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

const Project = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ts = useSelector((state) => state.setproject.troubleShootings);

  const [troubleShootings, setTroubleShootings] = useState();

  useEffect(() => {
    dispatch(actionCreators.setProjectDB(id));
    apis.projectTSGet(id).then((res) => setTroubleShootings(res.data.data));
    dispatch(actionCreators.setTroubleShootingDB(id));
  }, []);

  console.log(troubleShootings);

  return (
    <>
      <ProjHeader />

      <CardsContainer>
        <IntroduceContainer>
          <Introduce id={id} />
        </IntroduceContainer>
        {ts.map((e, i) => {
          return (
            <TroubleShootingContainer key={i}>
              <TroubleShooting {...e} />
            </TroubleShootingContainer>
          );
        })}
      </CardsContainer>
    </>
  );
};

const CardsContainer = styled.div`
  /* position: relative; */
  height: 100%;
  display: flex;
  flex-direction: column;
  /* flex-flow: row nowrap; */
  justify-content: flex-start;
  align-items: center;
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
  /* background-color: #111f30; */
  flex-shrink: 1;
`;

export default Project;
