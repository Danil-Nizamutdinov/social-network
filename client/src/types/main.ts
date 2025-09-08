export enum ActiveToggle {
  SEARCH = "search",
  MENU = "menu",
  PROFILE = "profile",
  AUTH = "auth",
  ADD_VIDEO = "addVideo",
  DESCRIPTION = "description",
  BACKGROUND = "background",
  CONTACT = "contact",
  NONE = "",
}

export interface IChannel {
  avatar: string;
  background: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  subscribers: number;
  updatedAt: string;
  userId: number;
}

export interface IVideo {
  channel: IChannel;
  channelId: number;
  createdAt: string;
  description: string;
  id: number;
  likeCounter: number;
  preview: string;
  title: string;
  updatedAt: string;
  video: string;
}

export interface IUser {
  id: number;
  avatar: string;
  login: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface AuthStart {
  tempUserId: number;
  resendCooldown: string;
  message: string;
}

export interface IComment {
  content: string;
  createdAt: string;
  dislike: number;
  id: number;
  like: number;
  updatedAt: string;
  user: IUser;
  userId: number;
  videoId: number;
}

export interface VideosResponse {
  page: number;
  totalPages: number;
  videos: IVideo[];
}

export interface VideoResponse {
  comments: IComment[];
  video: IVideo;
}

export interface INavLink {
  to: string;
  img: string;
  name: string;
}

export interface IChat {
  Members: any;
  Messages: IMessage[];
  Users: IUser[];
  createdAt: string;
  description: null | string;
  id: number;
  name: null | string;
  type: string;
  updatedAt: string;
}

export interface IMessage {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IIncoming {
  User: IUser;
  createdAt: string;
  friendId: number;
  id: number;
  status: string;
  updatedAt: string;
  userId: number;
}

export interface ISendFriendRequestResponse {
  incoming: IIncoming[];
  outgoing: any;
}

export interface IContact {
  avatar: string;
  email: string;
  id: number;
  login: string;
}

export interface IGetContactsResponse {
  Friend: IContact;
  createdAt: string;
  friendId: number;
  id: number;
  status: string;
  updatedAt: string;
  userId: number;
}
