/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthResponse, AuthStart } from "@src/types/main";
import { UserState } from "@src/types/storeTypes";
import {
  loginStart,
  checkAuth,
  logout,
  registrationStart,
  registrationVerify,
  resendVerificationCode,
  loginVerify,
} from "./ActionCreators/UserAC";

const setUserData = (state: UserState, action: PayloadAction<AuthResponse>) => {
  state.user = action.payload.user;
  localStorage.setItem("token", action.payload.accessToken);
  state.isAuth = true;
  state.isLoading = false;
  state.tempUserId = null;
};

const setTempUserData = (
  state: UserState,
  action: PayloadAction<AuthStart>
) => {
  state.tempUserId = action.payload.tempUserId;
  state.resendCooldownCode = action.payload.resendCooldown;
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
  tempUserId: null,
  error: "",
  resendCooldownCode: "",
  isLoading: false,
};

const userSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    removeTempUserId(state) {
      state.tempUserId = null;
      state.resendCooldownCode = "";
    },
    clearError(state) {
      state.error = "";
    },
    setNewError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStart.pending, handlePending)
      .addCase(loginStart.fulfilled, (state, action) =>
        setTempUserData(state, action)
      )
      .addCase(loginStart.rejected, (state, action) => setError(state, action))

      .addCase(loginVerify.pending, handlePending)
      .addCase(loginVerify.fulfilled, (state, action) =>
        setUserData(state, action)
      )
      .addCase(loginVerify.rejected, (state, action) => setError(state, action))

      .addCase(registrationStart.pending, handlePending)
      .addCase(registrationStart.fulfilled, (state, action) => {
        setTempUserData(state, action);
      })
      .addCase(registrationStart.rejected, (state, action) =>
        setError(state, action)
      )

      .addCase(resendVerificationCode.pending, handlePending)
      .addCase(resendVerificationCode.fulfilled, (state, action) => {
        setTempUserData(state, action);
      })
      .addCase(
        resendVerificationCode.rejected,
        (state, action) => setError(state, action) // ??
      )

      .addCase(registrationVerify.pending, handlePending)
      .addCase(registrationVerify.fulfilled, (state, action) => {
        setUserData(state, action);
      })
      .addCase(registrationVerify.rejected, (state, action) =>
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

export const { removeTempUserId, clearError, setNewError } = userSlice.actions;

export default userSlice.reducer;
