import { createGlobalStyle } from "styled-components";
import Main from "../pages/Main";
import { Link, Route, Switch } from "react-router-dom";
import MakePorf from "../pages/MakePorf";

import NotFound from "../pages/NotFound";
import MakeProj from "../pages/MakeProj";

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/portfolio">
          <>
            <div>포트폴리오 총 집합</div>
            <Link to="/write/portfolio/:id/:profid">
              포트폴리오 작성하기 임시 버튼입니다.
            </Link>
          </>
        </Route>
        <Route exact path="/portfolio/:id">
          <div>개인 포트폴리오 보여줌</div>
        </Route>
        <Route exact path="/write/portfolio/:id/:profid" component={MakePorf} />
        <Route exact path="/project">
          <>
            <div>프로젝트 총 집합</div>
            <Link to="/write/project/info">
              프로젝트 작성하기 임시 버튼입니다.
            </Link>
          </>
        </Route>
        <Route exact path="/project/:id">
          <div>프로젝트 한개 보여줌</div>
        </Route>
        <Route exact path="/write/project/:id" component={MakeProj} />
        <Route
          exact
          path="/write/project/:id/:projectid"
          component={MakeProj}
        />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
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
`;

export default App;
