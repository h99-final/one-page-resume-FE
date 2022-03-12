import axios from "axios";

const tokencheck = document.cookie;
const token = tokencheck.split(";")[1];

const search = localStorage.getItem("search");

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://3.36.85.128/",
  headers: {
    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    // accept: "*/*",
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    token: token,
    //로그인 후에는 토큰도 headers에 담아서 건내줘야한다.
  },
});

const formInstance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://3.36.85.128/",
  headers: {
    // "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    // accept: "*/*",
    "content-type": "multipart/form-data",
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

formInstance.interceptors.request.use(function (config) {
  const accesstoken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accesstoken}`;
  return config;
});

export const apis = {
  dupCheck: (email) => instance.post("/user/dupEmail", { email: email }),

  // 로그인 요청
  login: (email, password) =>
    instance.post("/user/login", {
      email: email,
      password: password,
    }),

  signup: (email, password, passwordCheck) =>
    instance.post("/user/signup", {
      email: email,
      password: password,
      passwordCheck: passwordCheck,
    }),

  addInfo: (data) => instance.post("/user/info", data),
  userInfo: () => instance.get("user/info"),
  putInfo: (data) => instance.put("user/info", data),

  introPorf: (data) => instance.put("porf/intro", data),
  introPorfGet: (porfId) => instance.get(`/porf/${porfId}/intro`),

  careerPorf: (data) => instance.post("/porf/career", data),
  careerPorfGet: (porfId) => instance.get(`/porf/${porfId}/career`),
  careerPorfDelete: (careerId) => instance.delete(`/porf/career/${careerId}`),
  careerPorfPut: (careerId, data) =>
    instance.put(`/porf/career/${careerId}`, data),

  projectPorf: (data) => instance.post("/porf/project", data),
  projectPorfGet: () => instance.get("/user/project"),

  addImg: (formData) => formInstance.put("user/profile", formData),

  porfStack: (addStack) => instance.put("/porf/stack", addStack),
  porfStackGet: (porfId) => instance.get(`/porf/${porfId}/stack`),

  createProject: (frmData) => formInstance.post("/project", frmData),
};
