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
  resize: none;
  border: none;
  background-color: white;
`;

export const Label = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  min-width: 150px;
  height: 49px;
  left: 0px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0px 50px 20px 50px;
  vertical-align: middle;
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
`;
