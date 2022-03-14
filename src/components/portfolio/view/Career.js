import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { actionCreators } from '../../../redux/modules/career';
import { apis } from '../../../shared/axios';

const Career = () => {
  const dispatch = useDispatch();

  const careers = useSelector(state => state.career.careers)

  useEffect(() => {
    dispatch(actionCreators.setCareerDB())

  }, []);

  console.log(careers)

  return (
    <>
      <Container>
        <TitleBox><h1>Work Experience</h1></TitleBox>
        <Box>
          {careers.map(e => {
            return (
              <CareerBox key={e.id}>
                <Label>
                  <h1>{e.title}</h1>
                  <h2>{e.startTime} ~ {e.endTime}</h2>
                </Label>

                <CareerContent>
                  <CareerTitle>
                    <h1>{e.subTitle}</h1>
                  </CareerTitle>
                  {e.contents.map((c, index) => {
                    return (
                      <h1 key={index}>
                        {c}
                      </h1>
                    )
                  })}
                </CareerContent>
              </CareerBox>
            )
          })}

        </Box>

      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 800px;
  max-width: 1440px;
  height: 810px;
`;

const Box = styled.div`
  width: 96%;
  height: 600px;
  margin: 31px auto;

`;

const CareerBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  h1{
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
    margin-right: 190px;
  }
`;
const Label = styled.div`
  width: 30%;
  height: 100%;
  text-align: center;
  align-items: center;
  h1{
    margin: auto;
    margin-top: 35px;
    margin-bottom: 16px;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
  h2{
    margin: auto;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.01em;
    color: #999999;
  }
`;
const CareerContent = styled.div`
  width: 70%;
  height: 100%;
  border-left: 1px solid black;
  h1{
    padding: 10px 20px;
    width: 80%;
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;
const CareerTitle = styled.div`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid;
  align-items: center;
  h1{
    padding: 20px;
    width: 80%;
    text-align: left;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;
const TitleBox = styled.div`
  width: 100%;
  height: 30px;
  margin-bottom: 30px;
  text-align: left;
  padding-left: 30px;
  h1{
    font-style: normal;
    font-weight: 600;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;

export default Career;
