import { createGlobalStyle } from "styled-components";
import Main from "../pages/Main";
import { Link, Redirect, Route, Switch } from "react-router-dom";
import MakePorf from "../pages/MakePorf";

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
import test from '../pages/test';

import KakaoAuthHandle from "../components/KakaoAuthHandle";
import KakaoAuthHandle2 from "../components/KakaoAuthHandle2";
import SocialLogin from "../pages/SocialLogin";
function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(userActions.userInfoDB());
  }, []);

  const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    return (
      <Route
        {...rest}
        render={(props) =>
          userInfo && restricted ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    );
  };

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /login page
      <Route
        {...rest}
        render={(props) =>
          !!userInfo ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  };

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/login" component={SocialLogin} />
        <Route
          exact
          path="/oauth/kakao/callback"
          component={KakaoAuthHandle}
        />
        <Route
          exact
          path="/oauth/kakao/callback/properties"
          component={KakaoAuthHandle2}
        />

        <Route exact path="/test" component={test} />
        <Route exact path="/editinfo/:id/:userId" component={EditInfo} />
        <Route exact path="/porflist" component={PorfList} />
        <Route exact path="/projlist" component={ProjList} />

        <Route exact path="/porf" component={Portfolio} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/" component={Main} />
        <Route exact path="/portfolio" component={PorfList} />
        <Route exact path="/portfolio/:id" component={Portfolio} />
        <Route exact path="/write/portfolio/:id/:profid" component={MakePorf} />

        <Route exact path="/project" component={ProjList} />
        <Route exact path="/project/:id" component={Project}></Route>

        <PrivateRoute
          path="/write/project/:id/:projectId"
          component={MakeProj}
        />
        <PrivateRoute path="/write/project/:id" component={MakeProj} />
        <PrivateRoute
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
time, mark, audio, video, input {

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
  font-family: Pretendard;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.01em;
}
input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`;

export default App;
