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
  user: { isFirstLogin: false },
  token: null,
};

// middleware actions
const loginDB = (isFirstLogin) => {
  return function (dispatch, getState, { history }) {
    dispatch(
      setUser({
        isFirstLogin: isFirstLogin,
      })
    )
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

const emailCheckDB = (email) => {
  return function (dispatch, getState, { history }) {
    apis
      .dupCheck(email)
      .then((res) => {
        dispatch(
          setUser({
            email: email
          })
        )
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
        draft.token = action.payload.user.token;
        draft.user = {
          email: action.payload.user.email,
          isFirstLogin: action.payload.user.isFirstLogin,
          portfolioId: action.payload.user.portfolioId,
          stack: action.payload.user.stack,
          userId: action.payload.user.userId,
        };
        console.log(action.payload)
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
  emailCheckDB,
  // loginCheckDB,
  userInfoDB,
};

export { actionCreators };