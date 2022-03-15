import React, { useEffect } from "react";
import { Content, FormText, FormTitle } from "../../shared/_sharedStyle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import CareerShow from "./CareerShow";
import CareerWrite from "./CareerWrite";
import { actionCreators as careerActions } from "../../../../redux/modules/career";
import Template from "../../shared/Template";
import PreviousNext from "../../shared/PreviousNext";

function Career() {
  const dispatch = useDispatch();
  const careers = useSelector((state) => state.career.careers);

  useEffect(() => {
    const porfId = JSON.parse(localStorage.getItem("userInfo")).porfId;
    dispatch(careerActions.setCareerDB(porfId));
  }, []);

  return (
    <>
      <FormTitleFlex>
        <FormText>직무 경험</FormText>
        <FormTextSpan>
          학교, 회사 또는 부트캠프, 교육, 자격증 등을 자유롭게 작성해주세요.
        </FormTextSpan>
      </FormTitleFlex>
      <CareerWrite />
      <hr />
      {careers?.map((e, i) => {
        return <CareerShow key={i + "e.id"} {...e} index={i} />;
      })}
      <hr />
      <PreviousNext />
      <Template />
    </>
  );
}

const FormTitleFlex = styled(FormTitle)`
  display: flex;
  justify-content: flex-start;
`;

export const FormTextSpan = styled(FormText)`
  font-size: 16px;
  width: auto;
`;

export default Career;
