import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/axios";

const SET_CAREER = "SET_CAREER";
const ADD_CAREER = "ADD_CAREER";
const DELETE_CAREER = "DELETE_CAREER";
const UPDATE_CAREER = "UPDATE_CAREER";

const setCareer = createAction(SET_CAREER, (careers) => ({ careers }));
const addCareer = createAction(ADD_CAREER, (career) => ({ career }));
const updateCareer = createAction(UPDATE_CAREER, (id, career) => ({
  id,
  career,
}));
const deleteCareer = createAction(DELETE_CAREER, (careerIndex) => ({
  careerIndex,
}));

const initialState = {
  careers: [],
};

const setCareerDB = () => {
  return async function (dispatch, getState, { history }) {
    const porfId = JSON.parse(localStorage.getItem("userInfo")).porfId;
    await apis
      .careerPorfGet(porfId)
      .then((res) => {
        dispatch(setCareer(res.data.data));
      })
      .catch((error) => {
        alert(error);
      });
  };
};

const addCareerDB = (career) => {
  return function (dispatch, getState, { history }) {
    apis.careerPorf(career).then((res) => {
      console.log(res.data.data);
      console.log(career);
      dispatch(addCareer(career));
    });
  };
};

const deleteCareerDB = (index) => {
  return async function (dispatch, getState, { history }) {
    await apis
      .careerPorfDelete(index)
      .then((res) => {
        dispatch(deleteCareer(index));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const updateCareerDB = (id, career) => {
  return async function (dispatch, getState, { history }) {
    await apis.careerPorfPut(id, career).then((res) => {
      console.log(res.data.data);
      console.log(career);
      window.ScrollTo(0, 0);
    });
  };
};

export default handleActions(
  {
    [SET_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.careers = action.payload.careers;
      }),
    [ADD_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.careers.unshift(action.payload.career);
        console.log(state.careers);
      }),
    [DELETE_CAREER]: (state, action) =>
      produce(state, (draft) => {
        draft.careers = draft.careers.filter(
          (e, i) => e.id !== action.payload.careerIndex
        );
      }),
    [UPDATE_CAREER]: (state, action) =>
      produce(state, (draft) => {
        let _index = draft.careers.findIndex((e) => e.id === action.payload.id);
        console.log(_index);
        draft.careers[_index] = action.payload.careers;
      }),
  },
  initialState
);

const actionCreators = {
  setCareer,
  addCareer,
  deleteCareer,
  setCareerDB,
  addCareerDB,
  deleteCareerDB,
  updateCareerDB,
};

export { actionCreators };
