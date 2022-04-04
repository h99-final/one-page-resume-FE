import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/axios";

const SET_PROJECT = "SET_PROJECT";
const SELECT_PROJECT = "SELECT_PROJECT";

const setProject = createAction(SET_PROJECT, (projects) => ({ projects }));
const selectProject = createAction(SELECT_PROJECT, (projectId) => ({
  projectId,
}));

const initialState = {
  selectedProjects: [],
  projects: [
    {
      id: "id0",
      title: "title0",
      img: "img",
      stack: ["stack0", "stack1", "stack0", "stack1", "stack0", "stack1"],
    },
    {
      id: "id1",
      title: "title1",
      img: "img",
      stack: ["stack0", "stack1", "stack0", "stack1", "stack0", "stack1"],
    },
  ],
};

const setProjectDB = () => {
  return function (dispatch, getState) {
    const porfId = JSON.parse(sessionStorage.getItem("userInfo")).porfId;
    apis
      .projectPorfGet()
      .then((res) => {
        dispatch(setProject(res.data.data));
        apis
          .projectMYPorfGet(porfId)
          .then((res) => {
            dispatch(selectProject(res.data.data));
          })
          .catch((error) => {
            if (error.response) {
              alert(error.response.data.data.errors[0].message);
            }
          });
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.data.errors[0].message);
        }
      });
  };
};

const selectedProjectDB = (porfId) => {
  return function (dispatch) {
    apis
      .projectMYPorfGet(porfId)
      .then((res) => {
        let projectsInPorf = [];
        res.data.data.map((e) => projectsInPorf.push(e.id));
        return projectsInPorf;
      })
      .then((projectsInPorf) => {
        dispatch(selectProject(projectsInPorf));
      });
  };
};

export default handleActions(
  {
    [SET_PROJECT]: (state, action) =>
      produce(state, (draft) => {
        draft.projects = action.payload.projects;
        draft.is_loading = false;
      }),
    [SELECT_PROJECT]: (state, action) =>
      produce(state, (draft) => {
        draft.selectedProjects = action.payload.projectId;
      }),
  },
  initialState
);

const actionCreators = {
  setProject,
  selectProject,
  setProjectDB,
  selectedProjectDB,
};

export { actionCreators };
