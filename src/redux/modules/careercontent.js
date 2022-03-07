import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

// 템플릿 변경이 전체 페이지 및 부모에게 영향을 주기 위한 액션
const SET_TEMPLATE = "SET_TEMPLATE";
const SET_CONTENT = "SET_CONTENT";
const ADD_CONTENT = "ADD_CONTENT";
const UPDATE_CONTENT = "UPDATE_CONTENT";
const DELETE_CONTENT = "DELETE_CONTENT";

const setTemplate = createAction(SET_TEMPLATE, (templateIndex) => ({
  templateIndex,
}));
const setContent = createAction(SET_CONTENT, (list) => ({ list }));
const addContent = createAction(ADD_CONTENT, (content, index) => ({
  content,
  index,
}));
const updateContent = createAction(UPDATE_CONTENT, (content, index) => ({
  content,
  index,
}));
const deleteContent = createAction(DELETE_CONTENT, (index) => ({ index }));

const initialState = {
  template: 0,
  content: [],
};

export default handleActions(
  {
    [SET_TEMPLATE]: (state, action) =>
      produce(state, (draft) => {
        draft.template = action.payload.templateIndex;
      }),
    [SET_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content = action.payload.list;
      }),
    [ADD_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content.unshift(action.payload.content);
      }),
    [UPDATE_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.content[action.payload.index] = action.payload.career;
      }),
    [DELETE_CONTENT]: (state, action) => {
      return state.content.filter((e, i) => i !== action.payload.index);
    },
  },
  initialState
);

const actionCreators = {
  setTemplate,
  setContent,
  addContent,
  updateContent,
  deleteContent,
};

export { actionCreators };
