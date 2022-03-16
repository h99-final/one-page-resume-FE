import { createGlobalStyle } from "styled-components";
import Main from "../pages/Main";
import { Link, Route, Switch } from "react-router-dom";
import MakePorf from "../pages/MakePorf";

import NotFound from "../pages/NotFound";
import MakeProj from "../pages/MakeProj";
import MyPage from "../pages/MyPage";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import EditInfo from '../pages/EditInfo';
import Portfolio from '../pages/Portfolio';
import Project from '../pages/Project';

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(userActions.userInfoDB());
  }, []);

  return (
    <>
      <GlobalStyle />
      <Switch>

        <Route exact path="/editinfo/:id/:userId" component={EditInfo} />

        <Route exact path="/porf" component={Portfolio} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/" component={Main} />
        <Route exact path="/portfolio">
          <>
            <div>포트폴리오 총 집합</div>
            <Link to={`/write/portfolio/introduce/${userInfo.porfId}`}>
              포트폴리오 작성하기 임시 버튼입니다.
            </Link>
          </>
        </Route>
        <Route exact path="/portfolio/:id" component={Portfolio} />
        <Route exact path="/write/portfolio/:id/:profid" component={MakePorf} />

        <Route exact path="/project">
          <>
            <div>프로젝트 총 집합</div>
            <Link to="/write/project/info">
              프로젝트 작성하기 임시 버튼입니다.
            </Link>
          </>
        </Route>
        <Route exact path="/project/:id" component={Project} />

        <Route path="/write/project/:id/:projectId" component={MakeProj} />
        <Route path="/write/project/:id" component={MakeProj} />
        <Route
          exact
          path="/write/project/:id/:projectId"
          component={MakeProj}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const GlobalStyle = createGlobalStyle`

@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
* {
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;
}
`;

export default App;
