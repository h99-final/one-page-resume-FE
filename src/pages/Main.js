
import React from 'react';
import styled from 'styled-components';
import Header from '../shared/Header';
import { useSelector } from 'react-redux';

const Main = () => {

  // const userInfo = useSelector(state => state.user.user)
  // console.log(userInfo)

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
position: relative;
min-width: 100%;
min-height: 100vh;
`;

export default Main;
