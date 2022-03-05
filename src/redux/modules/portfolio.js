import { produce } from "immer";
import { createAction, handleActions } from "redux-actions";

// 템플릿 변경이 전체 페이지 및 부모에게 영향을 주기 위한 액션
const SET_TEMPLATE = "SET_TEMPLATE";

const setTemplate = createAction(SET_TEMPLATE, (templateIndex) => ({
  templateIndex,
}));

const initialState = {
  template: 0,
};

export default handleActions(
  {
    [SET_TEMPLATE]: (state, action) =>
      produce(state, (draft) => {
        draft.template = action.payload.templateIndex;
      }),
  },
  initialState
);

const actionCreators = {
  setTemplate,
};

export { actionCreators };
