import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import CareerContent from "./modules/careerContent";
import image from "./modules/image";
import career from "./modules/career";
import project from "./modules/project";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: User,
  careerContent: CareerContent,
  image: image,
  career: career,
  project: project,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();
