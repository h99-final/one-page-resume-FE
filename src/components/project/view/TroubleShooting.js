import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { apis } from '../../../shared/axios';
import { actionCreators } from '../../../redux/modules/patchcode';
import { useDispatch } from 'react-redux';

const TroubleShooting = () => {

  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"))
  const [project, setProject] = useState("");
  const [ts, setTS] = useState("");

  useEffect(() => {
    dispatch(actionCreators)
    // apis.projectPorfGet()
    //   .then((res) => {
    //     setProject(res.data.data)
    //     apis.projectTSGet(res.data.data?.[3]?.id)
    //       .then((res) => {
    //         setTS(res.data.data)
    //       });
    //   });
  }, []);

  return (
    <>
      <Container>
        <Box>
          <Left>
            <Number>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
              <Square>

              </Square>
            </Number>
            <Commit>

            </Commit>
            <File>

            </File>
            <Content>
              대통령은 헌법과 법률이 정하는 바에 의하여 국군을 통수한다. 대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다. 국민경제의 발전을 위한 중요정책의 수립에 관하여 대통령의 자문에 응하기 위하여 국민경제자문회의를 둘 수 있다. 대법원에 대법관을 둔다. 다만, 법률이 정하는 바에 의하여 대법관이 아닌 법관을 둘 수 있다.
            </Content>
          </Left>
          <Right>

          </Right>
        </Box>
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  min-width: 800px;
  max-width: 1440px;
  height: 964px;
  background-color: white;
`;

const Box = styled.div`
  width: 95%;
  height: 900px;
  margin: 0px auto;
  padding-top: 32px;
  padding-bottom: 32px;
  display: flex;
`;
const Square = styled.button`
  width: 65px;
  height: 65px;
  background-color: white;
  border: 1px solid black;
  margin: 10px;
  padding: -10px;
`;
const Left = styled.div`
  width: 27%;
  height: 100%;
  margin-right: 25px;
`;

const Number = styled.div`
  width: 100%;
  border: 1px solid black;
`;
const Commit = styled.div`
  width: 100%;
  height: 64px;
  border: 1px solid black;
  flex-direction: row;
`;
const File = styled.div`
  width: 100%;
  height: 64px;
  border: 1px solid black;
  margin-bottom: 25px;
`;

const Content = styled.div`

  width: 100%;
  height: 520px;
  border: 1px solid black;
`;


const Right = styled.div`
  width: 73%;
  height: 100%;
  border: 1px solid ;
`;


export default TroubleShooting;
