import React from "react";
import styled from 'styled-components';
import Career from '../components/portfolio/view/Career';
import Introduce from '../components/portfolio/view/Introduce';
import Stack from '../components/portfolio/view/Stack';
import UserInfo from '../components/portfolio/view/UserInfo';
import Header from '../shared/Header';

const Portfolio = () => {

  return (
    <>
      <Header />
      <Introduce />
      <UserInfo />
      <Stack />
      <Career />
    </>
  );
}

const Container = styled.div`
  width: 100%;
`;

export default Portfolio;
