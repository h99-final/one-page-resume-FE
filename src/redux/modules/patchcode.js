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
const setFile = createAction(SET_FILE, (tsFile_list) => ({ tsFile_list }));
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
      console.log(res.data.data);
      dispatch(setPatchCode(res.data.data));
    });
  };
};

const troubleShootingDB = (projectId, data) => {
  return function (dispatch, getState) {
    console.log(data);
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
      console.log(res.data.data);
      let { patchCode, fileName, tsContent } = obj;
      let _data = {
        fileId: res.data.data.fileId,
        tsPatchCodes: patchCode,
        tsContent: tsContent,
        fileName: fileName,
      };
      dispatch(addFile(_data));
    });
  };
};

//ToDo
// 선택된 프로젝트에 귀속된 파일들 불러오기(트러블슈팅)
const getTroubleShootingDB = (projectId) => {
  return async function (dispatch, getState) {
    apis
      .projectTSGet(projectId)
      .then((res) => {
        //ToDo
        const commit = getState().patchcode.commit;
        const _tsFiles = res.data.data;
        let files = [];
        // _tsFiles.filter(e => e.commitId === commit.)
        console.log(files);
        dispatch(setFile(files));
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => {
        window.alert(error);
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
    [SET_FILE]: (state, action) =>
      produce(state, (draft) => {
        draft.tsFile = action.payload.tsFile_list;
        console.log(state.tsFile);
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
  getTroubleShootingDB,
};

export { actionCreators };
