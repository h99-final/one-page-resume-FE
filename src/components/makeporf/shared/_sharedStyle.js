import styled from "styled-components";

export const FormText = styled.div`
  width: 150px;
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
  margin: 0px 50px 10px 50px;
`;

export const ContentForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 5px;
`;

export const Inner = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  object-fit: cover;
`;

export const Line = styled.hr``;

export const ButtonText = styled(FormText)`
  width: 100%;
  font-size: 16px;
  font-style: normal;
`;

export const AddButton = styled.div`
  border: 1px solid;
  width: 350px;
  height: 80px;
  background: #ffffff;
  border-radius: 50px;
`;

export const ContentCareer = styled(Content)`
  display: flex;
  margin: 25px 0px;
  text-align: center;
`;

export const MakeCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  vertical-align: middle;
`;

export const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  width: 100%;
  height: 45px;
  background-color: #ffffff;
  border-radius: 50px;
`;

export const ErrorMessage = styled.span`
  font-family: Pretendard;
  font-size: 12px;
  color: #f00;
  text-align: right;
  display: flex;
  justify-content: right;
  padding-bottom: 15px;
  width: 94%;
  height: 10px;
`;
