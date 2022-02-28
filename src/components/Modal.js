import React from 'react';
import styled from 'styled-components';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

const Modal = ({ modalClose }) => {

  const [status, setStatus] = React.useState("aaa");
  const [email, setEmail] = React.useState();

  const inputEmail = (e) => {
    setEmail(e.target.value)
  }

  const userE = "aaa@aaa.com"
  const sumitEmail = () => {
    console.log(email)
    if (email === userE) {
      return (
        setStatus("bbb")
      )
    }
    setStatus("ccc")
  }


  return (
    <>
      <Container>
        <ModalBox>
          <WelcomeBox >
            이미지가 들어갈곳?aa
          </WelcomeBox>
          <UserBox >

            <button style={{ float: "right", backgroundColor: "inherit", border: "none" }} onClick={() => { modalClose(false); }}>❌</button>
            <h2>포트폴리오 작성 사이트입니다!</h2>

            {status === "aaa" && <>
              이메일 : <input onChange={inputEmail} />
              <button onClick={sumitEmail}>시작하기</button>
              <br></br>
            </>
            }
            {status === "bbb" && <Login />}
            {status === "ccc" && <Signup />}

          </UserBox>

        </ModalBox>

      </Container>
    </>
  )
}

export default Modal;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  // opacity: 0.5;
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;

const ModalBox = styled.div`
  border: 1px solid red;
  
  display: flex;
  width: 100vh;
  height: 60vh;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const WelcomeBox = styled.div`
  border: 1px solid black;
  padding: 24px;
  width: 350px;
  
  
`;

const ChangBtn = styled.div`

background-color: ${props => props.theme === 'light' ? 'white' : '#121212'};
  width: auto;
  margin: -1.5px;
  font-size: 16px;
  margin-left: 10px;
  font-weight: 600;
  color: #4cbc9b;
  font-weight: bold;

  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const UserBox = styled.div`

  border: 1px solid black;
  padding: 24px;
  width: 100%;

  
`;

const ChangeDiv = styled.div` 
  display: flex;
  align-items: flex-start;
  position: absolute;
  right: 25px;
  bottom: -40px;
`;
