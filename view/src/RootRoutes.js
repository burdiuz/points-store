import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const AnonymousRoutes = () => (
  <Switch>
    <Route path="/login"></Route>
    <Route path="/about"></Route>
  </Switch>
);

const SignedInRoutes = () => (
  <Switch>
    <Route path="/profile"></Route>
    <Route path="/tasks"></Route>
    <Route path="/history"></Route>
    <Route path="/users"></Route>
  </Switch>
);

const Routes = ({ signedIn }) => (
  <Router>{signedIn ? <SignedInRoutes /> : <AnonymousRoutes />}</Router>
);

export const RootRoutes = connect((state) => ({}))(Routes);
