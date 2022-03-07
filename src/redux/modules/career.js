import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

const SET_CAREER = "SET_CAREER";
const ADD_CAREER = "ADD_CAREER";

const setCareer = createAction((careers) => ({ careers }));
const addCareer = createAction((career) => ({ career }));

const initialState = {
  careers: [
    {
      title: "title",
      subTitle: "subTitle",
      contents: ["contents0", "contents1"],
      startTime: "time",
      endTime: "time",
    },
  ],
};

export default handleActions(
  {
    [SET_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.careers = action.payload.careers;
      }),
    [ADD_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.careers.unshift(action.payload.career);
      }),
  },
  initialState
);

const actionCreators = {
  setCareer,
  addCareer,
};

export { actionCreators };
