import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

const SET_CAREER_CONTENT = "SET_CAREER_CONTENT";
const ADD_CAREER_CONTENT = "ADD_CAREER_CONTENT";
const UPDATE_CAREER_CONTENT = "UPDATE_CAREER_CONTENT";
const DELETE_CAREER_CONTENT = "DELETE_CAREER_CONTENT";

const setContent = createAction(SET_CAREER_CONTENT, (contents) => ({
  contents,
}));
const addContent = createAction(ADD_CAREER_CONTENT, (content) => ({ content }));
const updateContent = createAction(UPDATE_CAREER_CONTENT, (content, index) => ({
  content,
  index,
}));
const deleteContent = createAction(DELETE_CAREER_CONTENT);

const initialState = {
  contents: [],
};

export default handleActions(
  {
    [SET_CAREER_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = action.payload.contents;
      }),
    [ADD_CAREER_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.contents.unshift({
          content: action.payload.content,
          id: Date.now(),
        });
      }),
    [UPDATE_CAREER_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.contents[action.payload.index] = {
          content: action.payload.content,
          id: Date.now(),
        };
      }),
    [DELETE_CAREER_CONTENT]: (state, action) =>
      produce(state, (draft) => {
        draft.contents = draft.contents.filter(
          (e) => e.id !== action.payload.id
        );
      }),
  },
  initialState
);

const actionCreators = {
  setContent,
  addContent,
  updateContent,
  deleteContent,
};

export { actionCreators };
