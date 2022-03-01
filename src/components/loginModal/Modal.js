
import React from 'react';
import styled from 'styled-components';
import Login from './Login';
import Signup from './Signup';
import { apis } from '../../shared/axios';

const Modal = ({ modalClose }) => {

  const [status, setStatus] = React.useState("aaa");
  const [email, setEmail] = React.useState();

  const inputEmail = (e) => {
    setEmail(e.target.value)
  }

  const userE = "aaa@aaa.com"

  const sumitEmail = () => {
    if (userE === email) {
      return (
        setStatus(true)
      )
    }
    setStatus(false)

    apis.emailCheck(email)
      .then((res) => {
        if (res === true) {
          return (
            setStatus(true)
          )
        }
        setStatus(false)
      })
  }


  return (
    <>
      <ModalBox>
        <WelcomeBox >
          <h1>Portfolio</h1>
          <p>Portfolio와 함께 하면 할 수 있는 것들이에요!</p>
          <TextBox>내 프로젝트에 도움이 되는 다양한 영감을 얻어요!</TextBox>
          <TextBox>예쁜 포트폴리오를 빠르게 만들어요.</TextBox>
          <TextBox>내가 보여주고 싶은 GitHub코드만 골라서 보여줄 수 있어요.</TextBox>
        </WelcomeBox>
        <UserBox >
          <div>
            <button style={{ float: "right", backgroundColor: "inherit", border: "none" }} onClick={() => { modalClose(false); }}>❌</button>
          </div>

          {status === "aaa" && <>
            <h1>시작하기</h1>
            <p>이메일을 입력해주세요</p>

            이메일 : <input onChange={inputEmail} />
            <div>
              <button onClick={sumitEmail}>시작하기</button>
            </div>

            <br></br>
          </>
          }

          {status === true && <Login email={email} />}
          {status === false && <Signup email={email} />}

        </UserBox>
      </ModalBox>
    </>
  )
}

export default Modal;


const ModalBox = styled.div`
  border: 1px solid red;
  display: flex;
  width: 1020px;
  height: 80vh;
  // Modal 창 브라우저 가운데로 조정
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  z-index: 100;
`;

const WelcomeBox = styled.div`
border: 1px solid red;
background-color: inherit;
width: 50%;
padding: 20px;
position: relative;
border-radius: 10px;
`;

const TextBox = styled.div`
background-color: white;
align-items: center;
text-align: center;
padding: 5px;
border-radius: 10px;
margin: 10px;
`;

const UserBox = styled.div`
  background-color: white;
  padding: 20px;
  position: relative;
  border-radius: 10px;
  min-height: 500px;
  min-width: 350px;
  width: 50%;

`;


