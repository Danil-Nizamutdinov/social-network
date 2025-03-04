import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "@src/api/AuthApi";
import { AppDispatch } from "@src/store/store";
import { AuthResponse } from "@src/types/main";
import { isAxiosError } from "axios";
import { toggleFalse } from "../toggleSlice";

interface ArgLogin {
  loginText: string;
  password: string;
}

export const login = createAsyncThunk<
  AuthResponse,
  ArgLogin,
  {
    rejectValue: string;
    dispatch: AppDispatch;
  }
>(
  "user/login",
  async ({ loginText, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.login(loginText, password);
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

export const registration = createAsyncThunk<
  AuthResponse,
  ArgLogin,
  { rejectValue: string; dispatch: AppDispatch }
>(
  "user/registration",
  async ({ loginText, password }, { rejectWithValue, dispatch }) => {
    try {
      const res = await authApi.registration(loginText, password);
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
