import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VideosPage from "./pages/VideosPage/VideosPage";
import VideoPage from "./pages/VideoPage/VideoPage";
import ChannelPage from "./pages/ChannelPage/ChannelPage";
import ChannelVideoList from "./components/Channel/ChannelOutlet/ChannelVideoList/ChannelVideoList";
import ChannelDescription from "./components/Channel/ChannelOutlet/ChannelDescription/ChannelDescription";
import ChatsPage from "./pages/ChatsPage/ChatsPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ChatPage from "./pages/ChatPage/ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <VideosPage />,
      },
      {
        path: "video",
        element: <VideosPage />,
      },
      {
        path: "video/:id",
        element: <VideoPage />,
      },
      {
        path: "channel/:id",
        element: <ChannelPage />,
        children: [
          {
            path: "",
            element: <ChannelVideoList />,
          },
          {
            path: "videos",
            element: <ChannelVideoList />,
          },
          {
            path: "description",
            element: <ChannelDescription />,
          },
        ],
      },
      {
        path: "/chats",
        element: (
          <PrivateRoute>
            <ChatsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/chats/:id",
        element: (
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
