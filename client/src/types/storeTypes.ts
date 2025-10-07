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

export interface ContactState {
  login: string;
  email: string;
  avatar: string;
  contactId: number | null;
  chatId: number | null;
}
