import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_BOOKMARK = "SET_BOOKMARK";
const ADD_BOOKMARK = "ADD_BOOKMARK";
const DELETE_BOOKMARK = "DELETE_BOOKMARK";

const setBookmark = createAction(SET_BOOKMARK, (projects) => ({ projects }));
const addBookmark = createAction(ADD_BOOKMARK, (projectId) => ({ projectId }));
const deleteBookmark = createAction(DELETE_BOOKMARK, (projectId) => ({
  projectId,
}));

const initialState = {
  myBookmark: [],
};

const addBookmarkDB = (projectId) => {
  return function (dispatch, getState) {
    apis
      .addBookmark(projectId)
      .then((res) => {
        dispatch(addBookmark(projectId));
      })
      .catch((error) => {
        alert(error.response.data.data.errors[0].message);
      });
  };
};
const deleteBookmarkDB = (projectId) => {
  return function (dispatch, getState) {
    apis
      .deleteBookmark(projectId)
      .then((res) => {
        dispatch(deleteBookmark(projectId));
      })
      .catch((error) => {
        alert(error.response.data.data.errors[0].message);
      });
  };
};

export default handleActions(
  {
    [SET_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.previews = action.payload.previews;
      }),
    [ADD_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.myBookmark.unshift(action.payload.projectId);
      }),

    [DELETE_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        draft.myBookmark = draft.myBookmark.filter(
          (e) => e !== action.payload.projectId
        );
      }),
  },
  initialState
);

const actionCreators = {
  setBookmark,
  addBookmark,
  deleteBookmark,
  addBookmarkDB,
  deleteBookmarkDB,
};

export { actionCreators };
