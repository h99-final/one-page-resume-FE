import { createGlobalStyle } from "styled-components";
import Main from "../pages/Main";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useLocation,
  useParams,
} from "react-router-dom";
import MakePorf from "../pages/MakePorf";
import { Helmet } from "react-helmet";
import NotFound from "../pages/NotFound";
import MakeProj from "../pages/MakeProj";
import MyPage from "../pages/MyPage";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/user";
import EditInfo from "../pages/EditInfo";
import Portfolio from "../pages/Portfolio";
import Project from "../pages/Project";
import PorfList from "../pages/PorfList";
import ProjList from "../pages/ProjList";
import KakaoAuthHandle from "../components/KakaoAuthHandle";
import Loading from "../components/makeproject/ts/Loading";
import GithubSpinner from "./GithubSpinner";
import Policy from '../pages/Policy';
import Privacy from '../pages/Privacy';

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);
  const { pathname } = useLocation();

  const isUserInfo = () => sessionStorage.getItem("userInfo");

  useEffect(() => {
    dispatch(userActions.userInfoDB());
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const PrivateRoute = ({ component: Component, restricted, ...rest }) => {
    if (!isUserInfo()) {
      window.alert("접근 권한이 없습니다.");
    }
    return (
      // 유저 정보가 있는지 여부에 따라서 보여줌
      // 아니면 홈 화면으로
      <Route
        {...rest}
        render={(props) =>
          !!isUserInfo() ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>포그 :: 개발자 포트폴리오의 A to Z</title>
        <link
          rel="icon"
          type="image/png"
          href={process.env.PUBLIC_URL + "/img/favicon.svg"}
          sizes="16x16"
        />
      </Helmet>
      <GlobalStyle />
      <Switch>
        <Route exact path="/user/kakao/callback" component={KakaoAuthHandle} />

        <Route exact path="/test" component={GithubSpinner} />
        <Route exact path="/policy" component={Policy} />
        <Route exact path="/privacy" component={Privacy} />
        <PrivateRoute exact path="/editinfo/:id/:userId" component={EditInfo} />
        <Route exact path="/porflist" component={PorfList} />
        <Route exact path="/projlist" component={ProjList} />

        <Route exact path="/porf" component={Portfolio} />
        {/* 마이페이지 */}
        <PrivateRoute restricted exact path="/mypage" component={MyPage} />
        {/* 메인페이지 */}
        <Route key={1} exact path="/" component={Main} />
        {/* 포트폴리오 페이지 */}
        <Route exact path="/portfolio" component={PorfList} />
        <Route exact path="/portfolio/:id" component={Portfolio} />
        <PrivateRoute
          exact
          path="/write/portfolio/:id/:profid"
          component={MakePorf}
        />
        {/* 프로젝트 페이지 */}
        <Route exact path="/project" component={ProjList} />
        <Route exact path="/project/:id" component={Project} />
        <PrivateRoute
          path="/write/project/:id/:projectId"
          component={MakeProj}
        />
        <PrivateRoute
          exact
          path="/write/project/:id/:projectId"
          component={MakeProj}
        />
        <PrivateRoute path="/write/project/:id" component={MakeProj} />
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
time, mark, audio, video, input {

	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

	display: block;
}
body {
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;

	line-height: 1;
  background-color: #1F2029;
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
  display: table;
  box-sizing: border-box;
  text-indent: initial;
}
* {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
}
input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
  html {
    scrollbar-color: #696b7b;
    scrollbar-width: thin;
}
`;

export default App;
