
import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import { useSelector } from 'react-redux';

const Main = () => {

  return (
    <>
      <Container>
        <Header />

      </Container>
    </>
  )
}
const Container = styled.div`
background-color: #555555;
width: 100%;
height: 100vh;
`;

export default Main;
