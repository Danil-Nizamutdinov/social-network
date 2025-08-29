import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@src/api/AuthApi";
import { AppDispatch } from "@src/store/store";
import { AuthResponse, AuthStart } from "@src/types/main";
import { isAxiosError } from "axios";
import { toggleFalse } from "../toggleSlice";

interface ArgLogin {
  loginText: string;
  password: string;
}

interface ArgReg {
  email: string;
  loginText: string;
  password: string;
}

interface ArgVerify {
  tempUserId: number;
  code: string;
}

export const loginStart = createAsyncThunk<
  AuthStart,
  ArgLogin,
  {
    rejectValue: string;
  }
>("user/loginStart", async ({ loginText, password }, { rejectWithValue }) => {
  try {
    const res = await authApi.loginStart(loginText, password);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Произошла ошибка"
      );
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

export const loginVerify = createAsyncThunk<
  AuthResponse,
  ArgVerify,
  { rejectValue: string; dispatch: AppDispatch }
>("user/login", async ({ tempUserId, code }, { rejectWithValue, dispatch }) => {
  try {
    const res = await authApi.loginVerify(tempUserId, code);
    dispatch(toggleFalse());
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Произошла ошибка"
      );
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

export const registrationStart = createAsyncThunk<
  AuthStart,
  ArgReg,
  { rejectValue: string }
>(
  "user/registrationStart",
  async ({ email, loginText, password }, { rejectWithValue }) => {
    try {
      const res = await authApi.registrationStart(email, loginText, password);
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Произошла ошибка"
        );
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const resendVerificationCode = createAsyncThunk<
  AuthStart,
  number,
  { rejectValue: string }
>("user/resendVerificationCode", async (tempUserId, { rejectWithValue }) => {
  try {
    const res = await authApi.resendVerificationCode(tempUserId);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Произошла ошибка"
      );
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

export const registrationVerify = createAsyncThunk<
  AuthResponse,
  ArgVerify,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "user/registration",
  async ({ tempUserId, code }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.registrationVerify(tempUserId, code);
      dispatch(toggleFalse());
      return res.data;
    } catch (error) {
      if (isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data.message || "Произошла ошибка"
        );
      }
      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const logout = createAsyncThunk<
  any,
  void,
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>("user/logout", async (_, { rejectWithValue, dispatch }) => {
  try {
    await authApi.logout();
    dispatch(toggleFalse());
    return {};
  } catch (error) {
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Произошла ошибка"
      );
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});

export const checkAuth = createAsyncThunk<
  any,
  void,
  {
    rejectValue: string;
  }
>("user/checkAuth", async (_, { rejectWithValue }) => {
  try {
    const res = await authApi.refresh();
    return res.data;
  } catch (error) {
    localStorage.removeItem("token");
    if (isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data.message || "Произошла ошибка"
      );
    }
    return rejectWithValue("Неизвестная ошибка");
  }
});
