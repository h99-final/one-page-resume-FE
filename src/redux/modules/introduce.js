import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_INTRODUCE = "SET_INTRODUCE";
const ADD_INTRODUCE = "ADD_INTRODUCE";

const setIntroduce = createAction(SET_INTRODUCE, (data) => ({ data }));
const addIntroduce = createAction(ADD_INTRODUCE, (data) => ({ data }));

const initialState = {
  introTitle: "",
  introContents: "",
};

const setIntroduceDB = () => {
  //toDo api호출 2번함 리팩토링 필요
  return async function (dispatch, getState, { history }) {
    await apis.userInfo().then((res) => {
      const porfId = res.data.data.porfId;
      apis.introPorfGet(porfId).then((res) => {
        console.log(res.data.data);
        dispatch(setIntroduce(res.data.data));
      });
    });
  };
};

const addIntroduceDB = (data) => {
  return function (dispatch, getState, { history }) {
    apis.introPorf(data).then((res) => {
      console.log(res);
    });
  };
};

export default handleActions(
  {
    [SET_INTRODUCE]: (state, action) =>
      produce(state, (draft) => {
        draft.introTitle = action.payload.data.title;
        draft.introContents = action.payload.data.contents;
      }),
  },
  initialState
);

const actionCreators = {
  setIntroduceDB,
  addIntroduceDB,
};

export { actionCreators };
