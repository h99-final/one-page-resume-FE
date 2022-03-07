import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

// 템플릿 변경이 전체 페이지 및 부모에게 영향을 주기 위한 액션
const SET_TEMPLATE = "SET_TEMPLATE";
const SET_CAREER = "SET_CAREER";
const ADD_CAREER = "ADD_CAREER";
const UPDATE_CAREER = "UPDATE_CAREER";

const setTemplate = createAction(SET_TEMPLATE, (templateIndex) => ({
  templateIndex,
}));
const setCareer = createAction(SET_CAREER, (list) => ({ list }));
const addCareer = createAction(ADD_CAREER, (career) => ({ career }));
const updateCareer = createAction(UPDATE_CAREER, (career, index) => ({
  career,
  index,
}));

const initialState = {
  template: 0,
  career: [],
};

export default handleActions(
  {
    [SET_TEMPLATE]: (state, action) =>
      produce(state, (draft) => {
        draft.template = action.payload.templateIndex;
      }),
    [SET_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.career = action.payload.list;
      }),
    [ADD_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.career.unshift(action.payload.career);
      }),
    [UPDATE_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.career[action.payload.index] = action.payload.career;
      }),
  },
  initialState
);

const actionCreators = {
  setTemplate,
  setCareer,
  addCareer,
  updateCareer,
};

export { actionCreators };
