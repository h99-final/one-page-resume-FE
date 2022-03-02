import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, setCookie } from "../../shared/cookie";
import { apis } from "../../shared/axios";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
  user: { email: "", nickname: "", isFirstLogin: false, },
  token: null,
};

// middleware actions
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(email, password)
      .then((res) => {
        setCookie("token", res.headers["authorization"], 1);
        const token = res.headers["authorization"];
        dispatch(
          setUser({
            isFirstLogin: res.data.isFirstLogin,
            portfolioId: res.data.portfolioId,
            userId: res.data.userId,
            email: res.data.email,
            stack: res.data.stack,
            token: token
          })
        )
      })
      .catch((error) => alert("회원정보가 일치하지 않습니다."));
  };
};



const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    deleteCookie("token");
    deleteCookie("token");
    // localStorage.removeItem("authorization");
    dispatch(logOut({ userinfo: { email: "", nickname: "" }, token: null }));
    history.replace("/");
    history.go(0);
  };
};

const SignUpDB = (email, password, passwordcheck) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(email, password, passwordcheck)
      .then((res) => {
        dispatch(loginDB(email, password))
        alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        alert("회원가입에 실패했습니다.");
      });
  };
};


const userInfoDB = (name, stack, phoneNum, gitURl, blogURl) => {
  return function (dispatch, getState, { history }) {
    apis
      .addInfo(name, stack, phoneNum, gitURl, blogURl)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };
};

// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.token = action.payload.user.token;
        draft.userinfo = {
          email: action.payload.user.email,
          nickname: action.payload.user.nickname,

        };
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // deleteCookie("is_login");
        draft.userinfo = null;
        draft.token = null;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),
  },
  initialState
);

// action creator export

const actionCreators = {
  logOut,
  getUser,
  loginDB,
  SignUpDB,

  // loginCheckDB,
  userInfoDB,
  logOutDB,
};

export { actionCreators };