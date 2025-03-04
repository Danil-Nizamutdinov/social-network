import { ActiveToggle, IUser } from "./main";

export interface ToggleState {
  activeToggle: ActiveToggle;
  isRegForm: boolean;
}

export interface UserState {
  isAuth: boolean;
  user: IUser | null;
  error: string;
  isLoading: boolean;
}
