import React from "react";
import { useHistory } from 'react-router-dom';
import styled from "styled-components";
import PortfolioIntroduce from '../components/portfolio/view/PortfolioIntroduce';
import UserInfo from '../components/portfolio/view/UserInfo';
import Header from '../shared/Header';

const test = () => {

  return (
    <>
      <Header />
      <PortfolioIntroduce />
      <UserInfo />
    </>
  );
};

export default test;


const NotFoundBtn = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 150px;
  border: 1px solid white;
  text-align: center;
  h1{
    margin: 25px 0px;
    color: white;
  }
  button{
    padding: 15px 20px;
    border: 1px solid #696B7B;
    border-radius: 10px;
    background-color: #696B7B;
    color: white;
  }
`

