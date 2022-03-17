import React from "react";
import styled from "styled-components";

function EditInfoHeader() {
  return (
    <>
      <Header>
        <LayoutHeader>
          <WritePorf>내 정보 수정</WritePorf>
        </LayoutHeader>
      </Header>
    </>
  );
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  margin-left: 30px;
  margin-top: 40px;
`;

const LayoutHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 400px;
  height: 63px;
  left: 0px;
  top: 0px;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 0px;
`;

const WritePorf = styled.div`
  width: 400px;
  height: 43px;
  left: 10px;
  top: 10px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 43px;
  letter-spacing: -0.01em;

  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const LayoutDetail = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  width: 400px;
  height: 39px;

  /* Inside auto layout */

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Detail = styled.div`
  width: 400px;
  height: 19px;

  /* body1 */

  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;

  color: #000000;

  /* Inside auto layout */
`;

export default EditInfoHeader;
