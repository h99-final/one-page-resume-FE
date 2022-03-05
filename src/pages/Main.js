

import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import { useSelector } from 'react-redux';
import Banner from '../components/Banner';
import Project from '../components/Project';


const Main = () => {
  // const userInfo = useSelector(state => state.user.user)
  // console.log(userInfo)

  return (
    <>
      <Container>
        <Header />
        <Banner />
        <br />
        <Project />

      </Container>
    </>
  );
};
const Container = styled.div`

background-color: white;
position: relative;
width: 100%;
height: 100vh;

`;


export default Main;
