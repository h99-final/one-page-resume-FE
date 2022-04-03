import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import {
  deleteCookie,
  getCookie,
  resetCookie,
  setCookie,
} from "../../shared/cookie";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const IS_FIRST_LOGIN = "IS_FIRST_LOGIN";

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user, token) => ({ user, token }));
const setFirstLogin = createAction(IS_FIRST_LOGIN, (status) => ({ status }));
// initialState
const initialState = {
  user: {},
  token: null,
  isFirstLogin: false,
};

// middleware actions
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(email, password)
      .then((res) => {
        setCookie("token", res.headers.authorization, 5);
        dispatch(setFirstLogin(res.data.data.isFirstLogin));
        // sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        if (res.data.data.isFirstLogin === true) {
          apis.userInfo().then((res) => {
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            dispatch(setUser(res.data.data));
          });
        } else {
          //dispatch(userInfoDB())는 왜 안되지?
          apis.userInfo().then((res) => {
            sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            dispatch(setUser(res.data.data));
            window.location.reload();
          });
          // window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const kakaoLoginDB = (code) => {
  return function (dispatch, getState, { history }) {
    apis
      .kakaoLogin1(code)
      .then((res) => {
        setCookie("token", res.headers.authorization, 5);
        dispatch(setFirstLogin(res.data.data.isFirstLogin));
        // sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
        history.push("/");
        if (res.data.data.isFirstLogin === true) {
          apis
            .userInfo()
            .then((res) => {
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            })
            .then((res) => dispatch(setUser(res.data.data)));
          // window.location.reload();
        } else {
          apis
            .userInfo()
            .then((res) => {
              sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
            })
            .then((res) => dispatch(setUser(res.data.data)));
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const SignUpDB = (email, password, passwordcheck) => {
  return function (dispatch, getState, { history }) {
    apis
      .signup(email, password, passwordcheck)
      .then((res) => {
        alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const userInfoDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .userInfo()
      .then(function (res) {
        dispatch(setUser(res.data.data));
        sessionStorage.setItem("userInfo", JSON.stringify(res.data.data));
      })
      .catch(function (error) {

      });
  };
};

const emailCheckDB = (email) => {
  return function (dispatch, getState, { history }) {
    apis
      .dupCheck(email)
      .then((res) => {
        dispatch(
          setUser({
            email: email,
          })
        );
        alert("회원가입이 완료되었습니다.");
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const addInfoDB = (data) => {
  return function (dispatch, getState, { history }) {
    apis
      .addInfo(data)
      .then((res) => { })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const logOutDB = () => {
  return function (dispatch, getState, { history }) {
    deleteCookie("token");
    resetCookie("token");
    history.go("/");
  };
};

// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.token = action.payload.user.token;
        draft.user = action.payload.user;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // deleteCookie("is_login");
        draft.userinfo = null;
        draft.token = null;
      }),
    [IS_FIRST_LOGIN]: (state, action) =>
      produce(state, (draft) => {
        draft.isFirstLogin = action.payload.status;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => { }),
  },
  initialState
);

// action creator export

const actionCreators = {
  setUser,
  logOut,
  getUser,
  loginDB,
  SignUpDB,
  emailCheckDB,
  addInfoDB,
  userInfoDB,
  logOutDB,
  kakaoLoginDB,
};

export { actionCreators };
