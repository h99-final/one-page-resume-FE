import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";
import { getCookie, setCookie } from "../../shared/cookie";

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
  isFirstLogin: true,
};

// middleware actions
const loginDB = (email, password) => {
  return function (dispatch, getState, { history }) {
    apis
      .login(email, password)
      .then((res) => {
        console.log(res);
        setCookie("token", res.headers.authorization, 5);
        dispatch(setFirstLogin(res.data.data.isFirstLogin));
        if (res.data.data.isFirstLogin === true) {
          console.log(res.data.data.isFirstLogin);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => alert("회원정보가 일치하지 않습니다."));
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
        alert("회원가입에 실패했습니다.");
      });
  };
};

const userInfoDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .userInfo()
      .then(function (res) {
        console.log(res.data.data);
        dispatch(setUser(res.data.data));
      })
      .catch(function (error) {
        console.log(error);
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
        alert("회원가입에 실패했습니다.");
      });
  };
};

const addInfoDB = (name, stack, phoneNum, gitURl, blogURl) => {
  return function (dispatch, getState, { history }) {
    apis
      .addInfo(name, stack, phoneNum, gitURl, blogURl)
      .then((res) => { })
      .catch((error) => console.log(error));
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
        console.log(action.payload.status);
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
};

export { actionCreators };
