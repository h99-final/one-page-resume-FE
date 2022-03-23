import React from "react";
import styled from "styled-components";
import { Font } from "../components/project/view/TroubleShooting";

function TopDown() {
  return (
    <>
      <TopDownButton>
        <Top
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <FontCute>Top</FontCute>
        </Top>
        <Down
          onClick={() => {
            window.scrollTo(0, document.body.scrollHeight);
          }}
        >
          <FontCute>Down</FontCute>
        </Down>
      </TopDownButton>
    </>
  );
}

const FontCute = styled.div`
  margin: auto;
  font-size: 14px;
  color: #fff;
`;

const TopDownButton = styled.div`
  flex-direction: column;
  align-content: center;
  position: fixed;
  right: 1px;
  bottom: 25px;
`;

const Top = styled.div`
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 10px;
  overflow-block: true;
  margin: auto;
  cursor: pointer;
`;

const Down = styled.div`
  display: flex;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 10px;
  overflow-block: true;
  cursor: pointer;
`;

export default TopDown;
