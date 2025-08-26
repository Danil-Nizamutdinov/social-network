import { ActiveToggle, IUser } from "./main";

export interface ToggleState {
  activeToggle: ActiveToggle;
  isRegForm: boolean;
}

export interface UserState {
  isAuth: boolean;
  user: IUser | null;
  tempUserId: number | null;
  resendCooldownCode: string;
  error: string;
  isLoading: boolean;
}
