import { createSlice } from '@reduxjs/toolkit';
import { fetchApi } from '../../fetchApi';
import { Role } from '../../utils';
import { updateProfile } from '../profile/profileSlice';

const fetchLoginApi = fetchApi('login', {
  method: 'POST',
});

const fetchLogoutApi = fetchApi('logout');

const slice = createSlice({
  name: 'login',
  initialState: {
    loggedIn: false,
    admin: false,
  },
  reducers: {
    updateOnSignIn: (state, { payload: { admin } }) => ({
      loggedIn: true,
      admin,
    }),
    updateOnSignOut: () => ({
      loggedIn: false,
      admin: false,
    }),
  },
});

export const { updateOnSignIn, updateOnSignOut } = slice.actions;
export const loginReducer = slice.reducer;

export const signIn = (username, password) => async (dispatch) => {
  const result = await fetchLoginApi(
    {},
    {
      username,
      password,
    },
  );

  dispatch(updateOnSignIn({ admin: result.role === Role.admin }));
  dispatch(updateProfile(result));
};

export const signOut = () => async (dispatch) => {
  await fetchLogoutApi();

  dispatch(updateOnSignIn(result));
};

export const selectIsSignedIn = ({ login: { loggedIn } }) => loggedIn;
export const selectIsAdmin = ({ login: { admin } }) => admin;
