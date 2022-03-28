const CLIENT_ID = "4c32bacbc9ab5815cc4d4c6b47e81b79";
// const CLIENT_ID = "VJpTbajO0uCuxjMMDVHsySylcDugTWEN";

// const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
const REDIRECT_URI = "https://poug.me/user/kakao/callback";

// const REDIRECT_URI_PRO =
//   "http://localhost:3000/oauth/kakao/callback/properties";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// //성별, 연령 동의 페이지
// export const KAKAO_ADD_PROPERTIES = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_PRO}&response_type=code&scope=gender,age_range`;