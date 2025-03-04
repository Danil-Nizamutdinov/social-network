import { AxiosResponse } from "axios";
import { AuthResponse } from "@src/types/main";
import { api } from "./index";

const authApi = {
  async login(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("user/login", { login, password });
  },

  async registration(
    login: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("user/registration", { login, password });
  },

  async logout(): Promise<void> {
    return api.post("user/logout");
  },
  async refresh(): Promise<AxiosResponse<AuthResponse>> {
    return api.get<AuthResponse>("user/refresh");
  },
};

export default authApi;
