import Main from "../pages/Main";
import { Link, Route, Switch } from "react-router-dom";
import MakePorf from "../pages/MakePorf";

import "./App.css";
import MainProj from "../pages/MakeProj";
import NotFound from "../pages/NotFound";
import MakeProj from "../pages/MakeProj";

import { useSelector } from 'react-redux';

function App() {
  // const userInfo = useSelector(state => state.user.user)
  // console.log(userInfo)

  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/portfolio">
          <>
            <div>포트폴리오 총 집합</div>
            <Link to="/portfolio/write/introduce">
              포트폴리오 작성하기 임시 버튼입니다.
            </Link>
          </>
        </Route>
        <Route exact path="/portfolio/:id">
          <div>개인 포트폴리오 보여줌</div>
        </Route>
        <Route exact path="/portfolio/write/:id" component={MakePorf} />
        <Route exact path="/project">
          <>
            <div>프로젝트 총 집합</div>
            <Link to="/project/write/">프로젝트 작성하기 임시 버튼입니다.</Link>
          </>
        </Route>
        <Route exact path="/project/:id">
          <div>프로젝트 한개 보여줌</div>
        </Route>
        <Route exact path="/project/write/:id" component={MakeProj} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
