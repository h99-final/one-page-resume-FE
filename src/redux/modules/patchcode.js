import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_PATCH_CODE = "SET_PATCH_CODE";

const SELECT_PATCH_CODE = "SELECT_PATCH_CODE";
const RESET_SELECT_PATCH_CODE = "RESET_SELECT_PATCH_CODE";

const SET_COMMIT = "SET_COMMIT";
const DELETE_TS = "DELETE_TS";

const SET_FILE = "SET_FILE";
const ADD_FILE = "ADD_FILE";
const ADD_TS_FILE = "ADD_TS_FILE";

const setPatchCode = createAction(SET_PATCH_CODE, (patchcode_list) => ({
  patchcode_list,
}));
const selectPatchCode = createAction(SELECT_PATCH_CODE, (fileName) => ({
  fileName,
}));
const resetSelectPatchCode = createAction(RESET_SELECT_PATCH_CODE);
const setCommit = createAction(SET_COMMIT, (commit) => ({ commit }));
const setFile = createAction(SET_FILE, (tsFile_list) => ({ tsFile_list }));
// 최초 커밋, 트러블 슈팅일때
const addFile = createAction(ADD_FILE, (tsFile) => ({ tsFile }));
// 트러블 슈팅 파일만 추가할때
const addTsFile = createAction(ADD_TS_FILE, (tsFile, commitIndex) => ({
  tsFile,
  commitIndex,
}));
const deleteTs = createAction(DELETE_TS, (projectId, commitId) => ({
  projectId,
  commitId,
}));

const initialState = {
  patchcode: [],
  commit: null,
  selectedPatchCode: [],
  tsFile: [{ commit: { message: "abc" } }],
};

const setPatchCodeAPI = (projectId, sha) => {
  return function (dispatch) {
    apis.gitCommitFile(projectId, sha).then((res) => {
      console.log(res.data.data);
      dispatch(setPatchCode(res.data.data));
    });
  };
};

const troubleShootingDB = (projectId, data) => {
  return function (dispatch, getState) {
    let commit = getState().patchcode.commit;
    let { tsName, ...obj } = data;
    let _data = {
      sha: commit.sha,
      commitMessage: commit.message,
      tsName: tsName,
      tsFile: [obj],
    };
    //ToDo
    apis.createTroubleShooting(projectId, _data).then((res) => {
      let { commitId } = res.data.data;
      let tsFiles = getState().patchcode.tsFile;
      console.log(obj);
      console.log(_data);
      let _index = tsFiles.findIndex((ts) => ts.commitId === commitId);
      console.log(_index);
      let { commitMessage, tsFile, ..._obj } = _data;
      let __data = {
        ..._obj,
        tsFiles: tsFile,
        commitMsg: commitMessage,
      };
      if (_index === -1) {
        dispatch(addFile(__data));
      } else {
        dispatch(addTsFile(obj, _index));
      }
    });
  };
};

// 선택된 프로젝트에 귀속된 파일들 불러오기(트러블슈팅)
const getTroubleShootingDB = (projectId) => {
  return async function (dispatch, getState) {
    apis
      .projectTSGet(projectId)
      .then((res) => {
        const _tsFiles = res.data.data;
        dispatch(setFile(_tsFiles));
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

const deleteTsDB = (projectId, commitId) => {
  return function (dispatch) {
    apis.deleteTroubleShooting(projectId, commitId).then((res) => {
      dispatch(deleteTs(projectId, commitId));
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
      }),
    [DELETE_TS]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile = draft.tsFile.filter(
          (ts) => ts.commitId !== action.payload.commitId
        );
      }),
    [SET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile = action.payload.tsFile_list;
      }),
    [ADD_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile.unshift(action.payload.tsFile);
        console.log(state.tsFile);
        draft.patchcode = null;
      }),
    [ADD_TS_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile[action.payload.commitIndex].tsFiles.unshift(
          action.payload.tsFile
        );
        console.log(state.tsFile);
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
  getTroubleShootingDB,
  deleteTsDB,
};

export { actionCreators };
