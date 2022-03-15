import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/axios";

const SET_PROJECT = "SET_PROJECT";
const SET_TROUBLE_SHOOTING = "SET_TROUBLE_SHOOTING";

const setProject = createAction(SET_PROJECT, (project) => ({ project }));
const setTroubleShooting = createAction(
  SET_TROUBLE_SHOOTING,
  (tsfile_list) => ({ tsfile_list })
);

const initialState = {
  project: {},
};

const intialTroubleShootings = {
  troubleShootings: [],
};

const setProjectDB = (projectId) => {
  return function (dispatch) {
    apis
      .projectGet(projectId)
      .then((res) => {
        dispatch(setProject(res.data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const setTroubleShootingDB = (projectId) => {
  return function (dispatch, getState) {
    let _project = getState().troubleshooting.project;
    apis.projectTSGet(projectId).then((res) => {
      let _data = {
        ..._project,
        tsFiles: res.data.data,
      };
      dispatch(setProject(_data));
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
        draft.project = {
          ...draft.project,
          ...action.payload.troubleShootings,
        };
      }),
  },
  initialState
);

const actionCreators = {
  setProjectDB,
  setTroubleShootingDB,
};

export { actionCreators };
