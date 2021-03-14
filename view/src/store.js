import { configureStore } from '@reduxjs/toolkit';

import { loginReducer } from './features/login/loginSlice';
import { profileReducer } from './features/profile/profileSlice';
import { usersReducer } from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    users: usersReducer,
  },
});
