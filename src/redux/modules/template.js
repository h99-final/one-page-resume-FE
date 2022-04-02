import { createAction, handleAction, handleActions } from "redux-actions";
import produce from "immer";
import { apis } from "../../shared/axios";

const SET_TEMPLATE_COLOR = "SET_TEMPLATE_COLOR";

const setTemplateColor = createAction(SET_TEMPLATE_COLOR, (colors) => ({
  colors,
}));

const initialState = {
  templatecolor: {},
};

const setBookmarkDB = (templateIdx) => {
  return function (dispatch, getState) {
    apis.introPorfGet(templateIdx).then((res) => {
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 1) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
      if (res.data.data === 0) {
        let _color = {
          fontcolor: "#fff",
          color: "#fff",
          templateIdx: 0,
          contrastColor: "000",
        };
        dispatch(setTemplateColor(_color));
      }
    });
  };
};

export default handleActions(
  {
    [SET_TEMPLATE_COLOR]: (state, action) =>
      produce(state, (draft) => {
        draft.templatecolor = action.payload.colors;
      }),
  },
  initialState
);
