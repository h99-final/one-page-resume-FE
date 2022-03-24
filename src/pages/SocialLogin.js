import React from "react";

import styled from "styled-components";
import { KAKAO_AUTH_URL } from "../shared/kakaoAuth";

const Login = (props) => {

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <React.Fragment>
      <a bg="#FFF" color="#474D56" href={KAKAO_AUTH_URL}>
        카카오톡
      </a>
    </React.Fragment>
  );
};

const WrapLogo = styled.div`
  width: 57px;
  height: 43px;
  padding: 9px 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  margin: auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e0e0e0;
`;

export default Login;