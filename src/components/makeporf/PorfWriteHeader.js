import React from "react";
import styled from "styled-components";

function PorfWriteHeader() {
  return (
    <>
      <Header>
        <h2>나만의 포트폴리오 작성하기</h2>
        <span>내 이야기를 담아 개성넘치는 포트폴리오를 만들어 보세요.</span>
      </Header>
    </>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;

  position: absolute;
  width: 406px;
  height: 102px;
  left: 30px;
  top: 100px;
`;

export default PorfWriteHeader;
