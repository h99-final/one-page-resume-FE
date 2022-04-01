import axios from "axios";
const tokencheck = document.cookie;
const token = tokencheck.split(";")[1];

const search = sessionStorage.getItem("search");

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소

  baseURL: "http://3.35.13.186/",
  // baseURL: "https://jonghun.shop",
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
  baseURL: "http://3.35.13.186/",
  // baseURL: "https://jonghun.shop",
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
  //카카오 소셜로그인
  kakaoLogin1: (
    code // 닉네임
  ) => instance.get(`/user/kakao/callback?code=${code}`),

  addInfo: (data) => instance.put("/user/info", data),
  userInfo: () => instance.get("user/info"),
  putStack: (data) => instance.put("user/stack", data),
  putPwd: (data) => instance.put("user/password", data),

  introPorf: (data) => instance.put("porf/intro", data),
  introPorfGet: (porfId) => instance.get(`/porf/${porfId}/intro`),
  porfShow: (show) => instance.post("porf/show", { show: show }),

  careerPorf: (data) => instance.post("/porf/career", data),
  careerPorfGet: (porfId) => instance.get(`/porf/${porfId}/career`),
  careerPorfDelete: (careerId) => instance.delete(`/porf/career/${careerId}`),
  careerPorfPut: (careerId, data) =>
    instance.put(`/porf/career/${careerId}`, data),

  templatePut: (idx) => instance.put("/porf/template", idx),

  //포트폴리오 스택 조회
  stackGet: (porfId) => instance.get(`/porf/${porfId}/stack`),

  projectPorf: (data) => instance.put("/porf/project", data),
  projectPorfGet: () => instance.get("/user/project"),
  projectMYPorfGet: (porfId) => instance.get(`/porf/${porfId}/project`),

  addImg: (formData) => formInstance.put("user/profile", formData),
  delImg: () => instance.delete("user/profile"),

  porfStack: (addStack) => instance.put("/porf/stack", addStack),
  porfStackGet: (porfId) => instance.get(`/porf/${porfId}/stack`),

  createProject: (frmData) => formInstance.post("/project", frmData),
  modifyInfoProject: (data, projectId) =>
    instance.put(`/project/${projectId}`, data),
  modifyPictureProject: (frmData, projectId) =>
    formInstance.post(`/project/${projectId}/image`, frmData),
  deletePictureProject: (projectId, imageId) =>
    instance.delete(`/project/${projectId}/image/${imageId}`),
  deleteProject: (projectId) => instance.delete(`/project/${projectId}`),

  createTroubleShooting: (projectId, data) =>
    instance.post(`/project/${projectId}/troubleShooting`, data),
  deleteTroubleShooting: (projectId, commitId) =>
    instance.delete(`/project/${projectId}/troubleShooting/${commitId}`),
  deleteTroubleShootingFile: (projectId, commitId, fileId) =>
    instance.delete(
      `/project/${projectId}/troubleShooting/${commitId}/file/${fileId}`
    ),
  updateTroubleShooting: (projectId, commitId, data) =>
    instance.put(`/project/${projectId}/troubleShooting/${commitId}`, data),

  projectGet: (projectId) => instance.get(`/project/${projectId}`),
  projectTSGet: (projectId) =>
    instance.get(`/project/${projectId}/troubleShooting`),

  //git sync 맞추기 -> github 데이터 새로고침
  gitsync: (projectId) => instance.get(`/project/${projectId}/git/sync`),
  //gitcommit 불러오기
  gitCommit: (projectId) => instance.get(`/project/${projectId}/git/commit`),
  //git file 불러오기
  gitCommitFile: (projectId, sha) =>
    instance.get(`/project/${projectId}/git/commit/${sha}/file`),
  checkSync: (projectId) =>
    instance.get(`/project/${projectId}/git/completion`),

  mainPorf: (stack, page) =>
    instance.post(`/porf/intro/recommend?page=${page}`, {
      stack: stack,
    }),

  mainProj: (stack, page) =>
    instance.post(`/project/stack?page=${page}`, {
      stack: stack,
    }),

  gitToken: (token) => instance.put("/user/git/token", token),
  delGitToken: () => instance.delete("/user/git/token"),

  addBookmark: (id) => instance.post(`/bookmark/project/${id}`),
  deleteBookmark: (id) => instance.delete(`/bookmark/project/${id}`),
  getBookmark: () => instance.get(`/bookmark/projectId`),
};
