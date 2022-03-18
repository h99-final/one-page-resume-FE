import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { apis } from '../../../shared/axios';
import { useParams } from 'react-router-dom';
import { actionCreators } from '../../../redux/modules/setProject';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProjHeader from '../../../shared/ProjHeader';

const TroubleShooting = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))

  const [ts, setTS] = useState([]);
  const [num, setNum] = useState(0);
  console.log(num)
  useEffect(() => {
    dispatch(actionCreators.setTroubleShootingDB(id))
    apis.projectTSGet(id)
      .then((res) => {
        setTS(res.data.data)
      });
  }, []);
  console.log(ts)

  // const project = useSelector(state => state.setproject.project.troubleShootings)
  // console.log(project)

  return (
    <>
      <Container>
        <Box>
          <Left>
            <Number >
              {ts?.map((e, i) => {
                return (
                  <>
                    <Square onClick={() => { setNum(i) }}>
                      <h1>{i + 1}</h1>
                    </Square>
                  </>
                )
              })}
            </Number>
            <Commit>
              <h1>{ts[num]?.tsName}</h1>
            </Commit>
            <File>
              <h1>{ts[num]?.tsFiles[0]?.fileName}</h1>
            </File>
            <Content>
              <h1>{ts[num]?.tsFiles[0]?.tsContent}</h1>
            </Content>
          </Left>
          <Right>
            {ts[num]?.tsFiles[0]?.tsPatchCodes}
          </Right>
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100vw;
  position: relative;
  background-color: white;
  border: 1px solid;
`;


const Box = styled.div`
  border: 1px solid;
  width: 95vw;
  margin: 0px auto;
  margin-top: 60px;
  padding-top: 32px;
  display: flex;
`;
const Square = styled.div`
  width: 65px;
  height: 65px;
  background-color: white;
  border: 1px solid black;
  text-align: center;
  h1{
    padding: 18px 0px;
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
    letter-spacing: -0.01em;
  }
`;
const Left = styled.div`
  width: 27%;
  height: 100%;
  margin-right: 25px;
`;

const Number = styled.div`
  width: 100%;
  border: 1px solid black;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
`;
const Commit = styled.div`
  width: 100%;
  border: 1px solid black;
  flex-direction: row;
  h1{
    padding: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;

const File = styled.div`
  width: 100%;
  border: 1px solid black;
  margin-bottom: 25px;
  flex-direction: row;
  word-wrap: break-word; 
  white-space: -moz-pre-wrap; 
  white-space: pre-wrap; 
  h1{
    padding: 20px;
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 520px;
  border: 1px solid black;
  h1{
    padding:20px;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
    color: #333333;
  }
`;


const Right = styled.div`
  width: 73%;
  border: 1px solid ;
`;


export default TroubleShooting;
