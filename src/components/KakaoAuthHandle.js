import React, { useEffect } from "react";
import { apis } from '../shared/axios';
import { KAKAO_AUTH_URL } from "../shared/kakaoAuth";
import { setCookie } from "../shared/cookie";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

//닉네임
const KakaoAuthHandle = (props) => {
  const history = useHistory()
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await apis.kakaoLogin1(code)
        .then((res) => {
          // setCookie("token", res.headers.authorization);
          console.log(res)
          alert(res)
          window.location.href = KAKAO_AUTH_URL;
        })
        .catch((err) => {

          console.log(err)
          history.push('/')

        })
    };
    kakaoLogin();
  }, []);

  return <Container alt="로딩 이미지" />;
};

export default KakaoAuthHandle;

const Container = styled.img`
  width: 100%;
  min-height: calc(100vh - 55px);
`;