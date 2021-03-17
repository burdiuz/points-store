import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Router, Switch, Route, Redirect } from './router';
import { MainLayout, useDefaultRoute } from './Layout';
import { LoginScreen } from './features/login';
import { AboutScreen } from './features/about';

import { selectIsSignedIn } from './features/login/loginSlice';
import { loadCurrentUser } from './features/profile/profileSlice';

const AnonymousRoutes = () => (
  <Switch>
    <Route path="/login" component={LoginScreen}></Route>
    <Route path="/about" component={AboutScreen}></Route>
    <Redirect to="/login" />
  </Switch>
);

const SignedInRoutes = () => {
  const defaultRoute = useDefaultRoute();

  return (
    <Switch>
      <Redirect from="/login" to="/" />
      <Route path="/:path" component={MainLayout}></Route>
      <Redirect to={`/${defaultRoute}`} />
    </Switch>
  );
};

export const Routes = () => {
  const signedIn = useSelector(selectIsSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, []);

  return <Router>{signedIn ? <SignedInRoutes /> : <AnonymousRoutes />}</Router>;
};
