import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

const SET_CAREER = "SET_CAREER";
const ADD_CAREER = "ADD_CAREER";

const setCareer = createAction(SET_CAREER, (careers) => ({ careers }));
const addCareer = createAction(ADD_CAREER, (career) => ({ career }));

const initialState = {
  careers: [],
};

export default handleActions(
  {
    [SET_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.careers = action.payload.careers;
      }),
    [ADD_CAREER]: (state, action) =>
      produce(state, (draft) => {
        console.log(state.careers);
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
