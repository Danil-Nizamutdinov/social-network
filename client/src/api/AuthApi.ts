import { AxiosResponse } from "axios";
import { AuthResponse, AuthStart } from "@src/types/main";
import { api } from "./index";

const authApi = {
  async loginStart(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthStart>> {
    return api.post<AuthStart>("user/login/start", { login, password });
  },

  async loginVerify(
    tempUserId: number,
    code: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("user/login/verify", {
      tempUserId,
      code,
    });
  },

  async registrationStart(
    email: string,
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthStart>> {
    return api.post<AuthStart>("user/registration/start", {
      login,
      password,
      email,
    });
  },

  async resendVerificationCode(
    tempUserId: number
  ): Promise<AxiosResponse<AuthStart>> {
    return api.post<AuthStart>("user/registration/resend_code", {
      tempUserId,
    });
  },

  async registrationVerify(
    tempUserId: number,
    code: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("user/registration/verify", {
      tempUserId,
      code,
    });
  },

  async logout(): Promise<void> {
    return api.post("user/logout");
  },
  async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return api.get<AuthResponse>("user/refresh");
  },
};

export default authApi;
