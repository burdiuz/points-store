import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from './router';
import { TabView, SceneMap } from 'react-native-tab-view';

import { HistoryScreen } from './features/history';
import { ProfileScreen } from './features/profile';
import { TasksScreen } from './features/tasks';
import { UsersScreen } from './features/users';

import { selectUserRole } from './features/profile/profileSlice';
import { Role } from './utils';

const Icon = () => null;

const ProfileIcon = (props) => <Icon {...props} name="person-outline" />;

const EarnIcon = (props) => <Icon {...props} name="checkmark-square-outline" />;

const SpendIcon = (props) => <Icon {...props} name="external-link-outline" />;

const PenaltyIcon = (props) => <Icon {...props} name="bell-outline" />;

const HistoryIcon = (props) => <Icon {...props} name="archive-outline" />;

const UsersIcon = (props) => <Icon {...props} name="email-outline" />;

const getCurrentIndex = (props, defaultUrl) => {
  const {
    indices,
    match: { url = defaultUrl },
  } = props;

  return indices[url.substr(1)];
};

const redirectToIndex = ({ indices }, history) => (index) => {
  const path = Object.keys(indices).find((key) => indices[key] === index);

  history.push(`/${path}`);
};

export const ReceiverLayout = (props) => {
  const history = useHistory();

  return (
    <TabView
      selectedIndex={getCurrentIndex(props, '/profile')}
      onSelect={redirectToIndex(props, history)}
      style={{ flex: 1 }}>
      <Tab icon={ProfileIcon} title="PROFILE">
        <ProfileScreen {...props} />
      </Tab>
      <Tab icon={EarnIcon} title="EARN">
        <TasksScreen {...props} />
      </Tab>
      <Tab icon={SpendIcon} title="SPEND">
        <TasksScreen {...props} />
      </Tab>
      <Tab icon={PenaltyIcon} title="FINES">
        <TasksScreen {...props} />
      </Tab>
      <Tab icon={HistoryIcon} title="HISTORY">
        <HistoryScreen {...props} />
      </Tab>
    </TabView>
  );
};

ReceiverLayout.propTypes = {
  indices: PropTypes.object,
};

ReceiverLayout.defaultProps = {
  indices: {
    profile: 0,
    earn: 1,
    spend: 2,
    fines: 3,
    history: 4,
    users: 5,
  },
};

export const SenderLayout = (props) => {
  const history = useHistory();

  return (
    <TabView
      selectedIndex={getCurrentIndex(props, '/profile')}
      onSelect={redirectToIndex(props, history)}
      style={{ flex: 1 }}>
      <Tab icon={EarnIcon} title="TASKS">
        <TasksScreen {...props} />
      </Tab>
      <Tab icon={PenaltyIcon} title="FINES">
        <TasksScreen {...props} />
      </Tab>
      <Tab icon={UsersIcon} title="USERS">
        <UsersScreen {...props} />
      </Tab>
    </TabView>
  );
};

SenderLayout.propTypes = {
  indices: PropTypes.object,
};

SenderLayout.defaultProps = {
  indices: {
    tasks: 0,
    fines: 1,
    users: 2,
  },
};

export const AdminLayout = (props) => {
  const history = useHistory();

  return (
    <TabView
      selectedIndex={getCurrentIndex(props, '/profile')}
      onSelect={redirectToIndex(props, history)}
      style={{ flex: 1 }}>
      <Tab icon={EarnIcon} title="ACTIONS">
        <TasksScreen {...props} />
      </Tab>
      <Tab icon={UsersIcon} title="USERS">
        <UsersScreen {...props} />
      </Tab>
    </TabView>
  );
};

AdminLayout.propTypes = {
  indices: PropTypes.object,
};

AdminLayout.defaultProps = {
  indices: {
    tasks: 0,
    users: 1,
  },
};

export const MainLayout = (props) => {
  const Layout = useMainLayout();

  return <Layout {...props} />;
};

export const useMainLayout = () => {
  let layout;

  switch (useSelector(selectUserRole)) {
    case Role.admin:
      layout = AdminLayout;
      break;
    case Role.sender:
      layout = SenderLayout;
      break;
    case Role.receiver:
    default:
      layout = ReceiverLayout;
      break;
  }

  return layout;
};

export const useDefaultRoute = () => {
  const {
    defaultProps: { indices },
  } = useMainLayout();

  return Object.keys(indices).find((key) => !indices[key]);
};

/*
{
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
};
*/
