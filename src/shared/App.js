
import { history } from "../redux/configStore";
import { ConnectedRouter } from 'connected-react-router';
import Main from '../pages/Main';
import { Route, Switch } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={Main} />
      </Switch>
    </ConnectedRouter>
  );
}

export default App;
