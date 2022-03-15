
import { createAction, handleActions } from "redux-actions"
import { produce } from "immer"
import { apis } from "../../shared/axios"
import project from './project'


const SET_PROJECT = "SET_PROJECT";
const SET_TROUBLE_SHOOTING = "SET_TROUBLE_SHOOTING";


const setProject = createAction(SET_PROJECT, (project) => ({ project }))
const setTroubleShooting = createAction(SET_TROUBLE_SHOOTING, (troubleShootings) => ({ troubleShootings }))

const initialState = {
  project: { imageUrl: [], troubleShootings: [] }
}


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
    let _project = getState()?.setProject?.project;
    apis.projectTSGet(projectId).then((res) => {
      let _data = { ..._project, troubleShootings: res.data.data, };
      dispatch(setTroubleShooting(_data));
    });
  };
};


export default handleActions(
  {
    [SET_PROJECT]: (state, action) =>
      produce(state, (draft) => {
        draft.project = action.payload.project
      }),
    [SET_TROUBLE_SHOOTING]: (state, action) =>
      produce(state, (draft) => {
        draft.project = { ...draft.project, ...action.payload.troubleShootings };
      }),
  },
  initialState
);

const actionCreators = {
  setProjectDB,
  setTroubleShootingDB,
};

export { actionCreators };
