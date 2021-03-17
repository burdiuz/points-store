import React from 'react';
import { Router, Switch, Route } from 'react-router-native';

import { UserAddScreen } from './UserAddScreen';
import { UserListScreen } from './UserListScreen';

export const UsersScreen = ({ match }) => (
  <Switch>
    <Route path={`${match.path}`} exact component={UserListScreen} />
    <Route path={`${match.path}/add`} component={UserAddScreen} />
  </Switch>
);
