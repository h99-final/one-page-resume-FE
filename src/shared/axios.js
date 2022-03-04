import axios from "axios";

const tokencheck = document.cookie;
const token = tokencheck.split("=")[1];

const search = localStorage.getItem("search");

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://3.34.52.24/",
  headers: {
    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    // accept: "*/*",
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    token: token,
    //로그인 후에는 토큰도 headers에 담아서 건내줘야한다.
  },
});

instance.interceptors.request.use(function (config) {
  const accesstoken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accesstoken}`;
  return config;
});

export const apis = {
  dupCheck: (email) => instance.post("/user/dupEmail", { email: email }),

  // 로그인 요청
  login: (email, password) =>
    instance.post(
      "/user/login",
      {
        email: email,
        password: password,
      },
    ),

  signup: (email, password, passwordCheck) =>
    instance.post("/user/signup", {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
    }),

  addInfo: (name, stack, phoneNum, gitUrl, blogUrl) =>
    instance.post("/user/info", {
      name: name,
      stack: stack,
      phoneNum: phoneNum,
      gitUrl: gitUrl,
      blogUrl: blogUrl,
    }),

};
