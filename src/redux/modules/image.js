import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";
const SET_PREVIEWS = "SET_PREVIEWS";
const UPLOADING = "UPLOADING";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const setPreviews = createAction(SET_PREVIEWS, (previews) => ({ previews }));
const uploading = createAction(UPLOADING, (uploading) => ({ uploading }));

const initialState = {
  image_url: "",
  uploading: false,
  previews: [],
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.previews = action.payload.previews;
      }),
    [SET_PREVIEWS]: (state, action) =>
      produce(state, (draft) => {
        draft.previews = action.payload.previews;
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
  setPreviews,
};

export { actionCreators };
