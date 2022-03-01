import { Route, Switch } from "react-router-dom";
import Main from "../pages/Main";
import MakePorf from "../pages/MakePorf";

import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/write/:id" component={MakePorf} />
        <Route exact path="/write/" component={MakePorf} />
      </Switch>
    </>
  );
}

export default App;
