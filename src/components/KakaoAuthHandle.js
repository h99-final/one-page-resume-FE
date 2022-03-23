import React, { useEffect } from "react";
import { apis } from '../shared/axios';
import { KAKAO_ADD_PROPERTIES } from "../shared/kakaoAuth";
import { setCookie } from "../shared/cookie";

import styled from "styled-components";

//닉네임
const KakaoAuthHandle = (props) => {

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await apis.kakaoLogin1(code)
        .then((res) => {
          setCookie("token", res.headers.authorization);
          localStorage.setItem("userId", res.data);
          window.location.href = KAKAO_ADD_PROPERTIES;
        });
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