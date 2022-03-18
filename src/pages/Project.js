import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import HorizontalScroll from "../components/project/view/horizontalScroll";
import Introduce from "../components/project/view/Introduce";
import TroubleShooting from "../components/project/view/TroubleShooting";
import { actionCreators } from "../redux/modules/setProject";
import ProjHeader from "../shared/ProjHeader";

const Project = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ts = useSelector((state) => state.setproject.troubleShootings);

  useEffect(() => {
    dispatch(actionCreators.setProjectDB(id));
    dispatch(actionCreators.setTroubleShootingDB(id));
  }, []);

  return (
    <>
      <ProjHeader />
      <HorizontalSection>
        <HorizontalScroll>
          <CardsContainer>
            <IntroduceContainer>
              <Introduce />
            </IntroduceContainer>
            {ts?.map((e, i) => {
              return (
                <TroubleShootingContainer>
                  <TroubleShooting {...e} />
                </TroubleShootingContainer>
              );
            })}
          </CardsContainer>
        </HorizontalScroll>
      </HorizontalSection>
    </>
  );
};

const Main = styled.div``;

const HorizontalSection = styled.section`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 60px);
`;
const CardsContainer = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;
const IntroduceContainer = styled.div`
  position: relative;
  height: 80vh;
  width: 100vw;
  /* background-color: #111f30; */
  margin-right: 25em;
  flex-shrink: 0;
`;

const TroubleShootingContainer = styled.div`
  position: relative;
  height: 80vh;
  width: 100vw;
  /* background-color: #111f30; */
  margin-right: 25em;
  flex-shrink: 0;
`;

const BumperSection = styled.section`
  text-align: center;
  padding: 128px 16px;
  background-color: #efefef;
`;

export default Project;
