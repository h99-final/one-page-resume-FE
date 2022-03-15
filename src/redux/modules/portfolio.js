import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const SET_INTRODUCE = "SET_INTRODUCE";

const setIntroduce = createAction(SET_INTRODUCE, (introduce) => ({
  introduce,
}));

const initialState = {
  introduce: {},
};

export default handleActions(
  {
    [SET_INTRODUCE]: (state, action) =>
      produce(state, (draft) => {
        draft.introduce = action.payload.introduce;
      }),
  },
  initialState
);

const actionCreators = {
  setIntroduce,
};

export { actionCreators };
