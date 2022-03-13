import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_PATCH_CODE = "SET_PATCH_CODE";

const SELECT_PATCH_CODE = "SELECT_PATCH_CODE";
const RESET_SELECT_PATCH_CODE = "RESET_SELECT_PATCH_CODE";

const SET_COMMIT = "SET_COMMIT";

const SET_FILE = "SET_FILE";
const ADD_FILE = "ADD_FILE";

const setPatchCode = createAction(SET_PATCH_CODE, (patchcode_list) => ({
  patchcode_list,
}));
const selectPatchCode = createAction(SELECT_PATCH_CODE, (fileName) => ({
  fileName,
}));
const resetSelectPatchCode = createAction(RESET_SELECT_PATCH_CODE);
const setCommit = createAction(SET_COMMIT, (commit) => ({ commit }));
const setFile = createAction(SET_FILE, (tsFile) => ({ tsFile }));
const addFile = createAction(ADD_FILE, (tsFile) => ({ tsFile }));

const initialState = {
  patchcode: [],
  commit: null,
  selectedPatchCode: [],
  tsFile: [],
};

const setPatchCodeAPI = (projectId, sha) => {
  return function (dispatch) {
    apis.gitCommitFile(projectId, sha).then((res) => {
      dispatch(setPatchCode(res.data.data));
    });
  };
};

const troubleShootingDB = (projectId) => {
  return async function (dispatch, getState) {
    let commit = getState().patchcode.commit;
    let ts = getState().patchcode.tsFile;
    let tsFile = ts.map((e) => {
      let { tsName, ...obj } = e;
      return obj;
    });
    console.log(commit);
    let _data = {
      sha: commit[0].sha,
      commitMessage: commit[0].message,
      tsName: ts[0].tsName,
      tsFile: tsFile,
    };
    await apis.createTroubleShooting(projectId, _data).then((res) => {
      console.log(res.data.data);
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
    [RESET_SELECT_PATCH_CODE]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedPatchCode = null;
      }),
    [SET_COMMIT]: (state, action) =>
      produce(state, (draft) => {
        draft.commit = action.payload.commit;
        console.log(action.payload.commit);
      }),
    [SET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile = action.payload.tsFile;
      }),
    [ADD_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile.unshift(action.payload.tsFile);
        draft.patchcode = null;
      }),
  },
  initialState
);

const actionCreators = {
  setPatchCodeAPI,
  setPatchCode,
  selectPatchCode,
  resetSelectPatchCode,
  setCommit,
  setFile,
  addFile,
  troubleShootingDB,
};

export { actionCreators };
