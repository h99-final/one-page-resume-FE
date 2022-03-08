import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

const SET_PROJECT = "SET_PROJECT";

const setProject = createAction((projects) => ({ projects }));

const initialState = {
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

export default handleActions(
  {
    [SET_PROJECT]: (state, action) =>
      produce(state, (draft) => {
        draft.projects = action.payload.projects;
      }),
  },
  initialState
);

const actionCreators = {
  setProject,
};

export { actionCreators };
