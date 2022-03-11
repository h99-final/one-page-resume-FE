import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_PATCH_CODE = "SET_PATCH_CODE";
const SELECT_PATCH_CODE = "SELECT_PATCH_CODE";

const setPatchCode = createAction(SET_PATCH_CODE, (patchcode_list) => ({
  patchcode_list,
}));
const selectPatchCode = createAction(SELECT_PATCH_CODE, (fileName) => ({
  fileName,
}));

const initialState = {
  patchcode: [],
  projectId: 0,
  selectedPatchCode: [],
};

const setPatchCodeAPI = (projectId, sha) => {
  return function (dispatch) {
    apis.gitCommitFile(projectId, sha).then((res) => {
      dispatch(setPatchCode(res.data.data));
    });
  };
};

export default handleActions(
  {
    [SET_PATCH_CODE]: (state, action) =>
      produce(state, (draft) => {
        draft.patchcode = action.payload.patchcode_list;
      }),
    [SELECT_PATCH_CODE]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedPatchCode = draft.patchcode.filter(
          (e) => e.name === action.payload.fileName
        );
      }),
  },
  initialState
);

const actionCreators = {
  setPatchCodeAPI,
  setPatchCode,
  selectPatchCode,
};

export { actionCreators };
