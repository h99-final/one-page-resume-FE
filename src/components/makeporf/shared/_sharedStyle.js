import styled from "styled-components";

export const FormText = styled.div`
  width: 125px;
  height: 24px;
  left: 0px;

  font-family: Pretendard;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #000000;
`;

export const ButtonBucket = styled.div`
  display: inline-block;
  height: 60px;
  width: 100%;
`;

export const Next = styled.div`
  float: right;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 62px;
  width: 115px;
  background: #333333;
  border-radius: 43px;
  & > span {
    font-family: Pretendard;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #ffffff;
  }
`;

export const FormTitle = styled.div`
  margin: 50px 60px;
  justify-content: center;
`;

export const InputCustom = styled.textarea`
  width: 1120px;
  height: 19px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 15px 15px;
  margin: auto;
`;

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  padding: 15px 0px;

  width: 150px;
  height: 49px;
  left: 0px;
  top: 10px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  margin: 0px 50px;
`;
