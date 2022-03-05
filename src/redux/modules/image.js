import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";
const UPLOADING = "UPLOADING";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));

const initialState = {
  image_url: "",
  uploading: false,
  preview: null,
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [UPLOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
      }),
  },
  initialState
);

const actionCreators = {
  setPreview,
  uploading,
};

export { actionCreators };
