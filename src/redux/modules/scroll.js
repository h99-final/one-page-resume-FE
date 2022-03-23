import produce from "immer";
import { createAction, handleActions } from "redux-actions";

const SET_SCROLL = "SET_SCROLL";
const RESET_SCROLL = "RESET_SCROLL";

const setScroll = createAction(SET_SCROLL, (scroll) => ({
  scroll,
}));
const resetScroll = createAction(RESET_SCROLL, () => ({}));

const initialState = {
  scroll: {
    introduce: 0,
    userInfo: 0,
    career: 0,
    stack: 0,
    project: [],
    troubleShooting: [],
  },
};

export default handleActions(
  {
    [SET_SCROLL]: (state, action) =>
      produce(state, (draft) => {
        draft.scroll = action.payload.scroll;
      }),
    [RESET_SCROLL]: (state, action) =>
      produce(state, (draft) => {
        draft.scroll = null;
      }),
  },
  initialState
);

const actionCreators = {
  setScroll,
  resetScroll,
};

export { actionCreators };
