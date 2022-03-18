import React from "react";
import styled from 'styled-components';
import HorizontalScroll from '../components/project/view/horizontalScroll';
import Introduce from '../components/project/view/Introduce';
import TroubleShooting from '../components/project/view/TroubleShooting';
import ProjHeader from '../shared/ProjHeader';

const Project = () => {

  return (
    <>
      <ProjHeader />
      <HorizontalSection>
        <HorizontalScroll>
          <CardsContainer>
            <Introduce />
            <TroubleShooting />
          </CardsContainer>
        </HorizontalScroll>
      </HorizontalSection>
    </>
  );
}

const HorizontalSection = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;
const CardsContainer = styled.div`
  position: relative;
  height: 100%;
  padding: 0 0 0 0px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;

export default Project;
