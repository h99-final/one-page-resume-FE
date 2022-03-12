import React from "react";
import styled from 'styled-components';
import Introduce from '../components/portfolio/view/Introduce';
import Stack from '../components/portfolio/view/Stack';
import UserInfo from '../components/portfolio/view/UserInfo';

const Portfolio = () => {

  return (
    <>
      <Introduce />
      <UserInfo />
      <Stack />
    </>
  );
}

const Container = styled.div`
  width: 100%;
`;

export default Portfolio;
