import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

const SET_PROJECT = "SET_PROJECT";
const SET_TROUBLE_SHOOTING = "SET_TROUBLE_SHOOTING";
const SET_PROJECT_TS = "SET_PROJECT_TS";

const SET_IS_LOADING = "SET_IS_LOADING";

const setProject = createAction(SET_PROJECT, (project) => ({ project }));
const setTroubleShooting = createAction(
  SET_TROUBLE_SHOOTING,
  (troubleShootings) => ({ troubleShootings })
);
const setProjectTS = createAction(SET_PROJECT_TS, (tsFiles) => ({ tsFiles }));

const setIs_loading = createAction(SET_IS_LOADING);

const initialState = {
  project: { imageUrl: [], troubleShootings: [] },
  troubleShootings: [],
  is_loading: true,
};

const setProjectDB = (projectId) => {
  return function (dispatch) {
    apis
      .projectGet(projectId)
      .then((res) => {
        dispatch(setProject(res.data.data));
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const setTroubleShootingDB = (projectId) => {
  return function (dispatch, getState) {
    apis
      .projectTSGet(projectId)
      .then((res) => {
        let _troubleShootings = res.data.data;
        let __troubleShootings = [];
        let __tsProject = [];
        _troubleShootings.map((e) => __tsProject.push(e));
        dispatch(setProjectTS(__tsProject));
        for (let i = 0; i < _troubleShootings.length; i++) {
          _troubleShootings[i].tsFiles.map((tsFile) => {
            return __troubleShootings.push(tsFile);
          });
        }
        dispatch(setTroubleShooting(__troubleShootings));
      })
      .then(() => {
        dispatch(setIs_loading());
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

export default handleActions(
  {
    [SET_PROJECT]: (state, action) =>
      produce(state, (draft) => {
        draft.project = action.payload.project;
      }),
    [SET_TROUBLE_SHOOTING]: (state, action) =>
      produce(state, (draft) => {
        draft.troubleShootings = action.payload.troubleShootings;
      }),
    [SET_PROJECT_TS]: (state, action) =>
      produce(state, (draft) => {
        draft.project.troubleShootings = action.payload.tsFiles;
      }),
    [SET_IS_LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = false;
      }),
  },
  initialState
);

const actionCreators = {
  setProjectDB,
  setTroubleShootingDB,
};

export { actionCreators };
