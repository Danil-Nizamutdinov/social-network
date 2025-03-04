/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse } from "@src/types/main";
import { UserState } from "@src/types/storeTypes";
import {
  login,
  checkAuth,
  logout,
  registration,
} from "./ActionCreators/UserAC";

const setUserData = (state: UserState, action: PayloadAction<AuthResponse>) => {
  state.user = action.payload.user;
  localStorage.setItem("token", action.payload.accessToken);
  state.isAuth = true;
  state.isLoading = false;
};

const setError = (
  state: UserState,
  action: PayloadAction<string | undefined>
) => {
  state.error = action.payload || "Произошла ошибка";
  state.isLoading = false;
};

const handlePending = (state: UserState) => {
  state.isLoading = true;
};

const initialState: UserState = {
  isAuth: !!localStorage.getItem("token"),
  user: null,
  error: "",
  isLoading: false,
};

const userSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => setUserData(state, action))
      .addCase(login.rejected, (state, action) => setError(state, action))

      .addCase(registration.pending, handlePending)
      .addCase(registration.fulfilled, (state, action) =>
        setUserData(state, action)
      )
      .addCase(registration.rejected, (state, action) =>
        setError(state, action)
      )

      .addCase(logout.pending, handlePending)
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem("token");
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => setError(state, action))

      .addCase(checkAuth.pending, handlePending)
      .addCase(checkAuth.fulfilled, (state, action) =>
        setUserData(state, action)
      );
  },
});

export default userSlice.reducer;
