import { useEffect, useState } from "react";
import { Chat } from "../dto.ts";
import { getChatsFromApi } from "../api.ts";

export const useGetChats = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchChats() {
    setIsLoading(true);

    const chatsData = await getChatsFromApi();

    if (chatsData?.length) {
      setChats(chatsData);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    isLoading,
  };
};
