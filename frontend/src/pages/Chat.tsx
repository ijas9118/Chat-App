import { FC, useEffect } from "react";
import apiClient from "../axiosConfig";

const Chat: FC = () => {
  useEffect(() => {
    try {
      const result = apiClient("/users?search=af");

      console.log(result);
    } catch (error) {}
  }, []);
  return <div>Chat</div>;
};

export default Chat;
