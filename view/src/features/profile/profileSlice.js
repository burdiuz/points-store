import { createSlice } from '@reduxjs/toolkit';

import { fetchApi } from '../../fetchApi';

const fetchUserProfileApi = fetchApi('me');
const fetchUserPointsApi = fetchApi('points');

const slice = createSlice({
  name: 'profile',
  initialState: {
    id: 0,
    username: '',
    role: '',
    points: 0,
  },
  reducers: {
    updateProfile: (state, { payload: { id, username, role } }) => ({
      ...state,
      id,
      username,
      role,
    }),
    updatePoints: (state, { payload: { amount } }) => ({
      ...state,
      points: amount,
    }),
  },
});

export const { updateProfile, updatePoints } = slice.actions;
export const profileReducer = slice.reducer;

export const loadCurrentUser = () => async (dispatch) => {
  const result = await fetchUserProfileApi();

  dispatch(updateProfile(result));
  return result;
};

export const loadUserPoints = () => async (dispatch) => {
  const result = await fetchUserPointsApi();

  dispatch(updatePoints(result));
  return result;
};

export const loadUserProfile = () => async (dispatch) => {
  await dispatch(loadCurrentUser());
  await dispatch(loadUserPoints());
};

export const selectUserId = ({ profile: { id } }) => id;
export const selectUserName = ({ profile: { username } }) => username;
export const selectUserRole = ({ profile: { role } }) => role;
export const selectUserPoints = ({ profile: { points } }) => points;
