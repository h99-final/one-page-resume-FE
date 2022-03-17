import React from "react";
import styled from 'styled-components';
import Introduce from '../components/project/view/Introduce';
import TroubleShooting from '../components/project/view/TroubleShooting';
import ProjHeader from '../shared/ProjHeader';

const Project = () => {

  return (
    <>
      <ProjHeader />
      <Introduce />
      <TroubleShooting />
    </>
  );
}

export default Project;
