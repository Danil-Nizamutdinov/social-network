import { util } from "@src/services/contactService";
import { util as ChatUtil } from "@src/services/ChatService";
import { useEffect } from "react";
import { useAppDispatch } from "./redux";

const useSse = (userId: number | undefined): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userId) {
      const eventSource = new EventSource(
        `http://localhost:5000/api/sse/sse?userId=${userId}`,
        { withCredentials: true }
      );

      eventSource.onopen = () => {
        console.log("SSE connection opened");
      };

      eventSource.onmessage = (event) => {
        console.log("SSE message received:", event.data);
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);

        if (data === "message") {
          dispatch(ChatUtil.invalidateTags(["getChat"]));
        }
        if (data === "contact") {
          dispatch(util.invalidateTags(["getRequest"]));
        }
      };

      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
      };

      return () => {
        console.log("Cleaning up SSE connection");
        eventSource.close();
      };
    }
    return () => {
      console.log("component unmount");
    };
  }, [dispatch, userId]);
};

export default useSse;
