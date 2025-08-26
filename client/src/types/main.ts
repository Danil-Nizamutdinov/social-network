export enum ActiveToggle {
  SEARCH = "search",
  MENU = "menu",
  PROFILE = "profile",
  AUTH = "auth",
  ADD_VIDEO = "addVideo",
  DESCRIPTION = "description",
  BACKGROUND = "background",
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

export interface AuthResponseRegStart {
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
  createdAt: string;
  id: number;
  lastMessage: string;
  updatedAt: string;
  user1Id: number;
  user2Id: number;
  users: IUser[];
}

export interface IMessage {
  chatId: number;
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  userId: number;
}
