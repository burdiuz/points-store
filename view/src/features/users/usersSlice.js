import { createSlice } from '@reduxjs/toolkit';

import { fetchApi } from '../../fetchApi';

const fetchUsersApi = fetchApi('users');

const slice = createSlice({
  name: 'users',
  initialState: {
    list: [],
  },
  reducers: {
    updateUserList: (state, { payload: list }) => ({
      ...state,
      list,
    }),
  },
});

export const { updateUserList } = slice.actions;
export const usersReducer = slice.reducer;

export const loadUserList = () => async (dispatch) => {
  const result = await fetchUsersApi();

  dispatch(updateUserList(result.payload));
  return result;
};

export const createUser = (username, password, role, active = true) => async (
  dispatch,
) => {
  const result = await fetchUsersApi(
    { method: 'POST' },
    { username, password, role, active },
  );

  dispatch(loadUserList());
  return result;
};

export const updateUser = (id, role, active = true) => async (dispatch) => {
  const result = await fetchUsersApi({ method: 'PATCH' }, { id, role, active });

  dispatch(loadUserList());
  return result;
};

export const changeUserPassword = (id, old_password, new_password) => async (
  dispatch,
) => {
  const result = await fetchApi('users/password')(
    { method: 'PUT' },
    { id, old_password, new_password },
  );

  return result;
};

export const selectUserList = ({ users: { list } }) => list;
