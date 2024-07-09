import { useEffect, useState } from "react";
import { Chat, User } from "../dto.ts";
import { createUserFromApi, getChatsFromApi } from "../api.ts";

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);

  async function createUser(data: User) {
    setIsLoading(true);

    await createUserFromApi(data);

    setIsLoading(false);
  }

  return {
    createUser,
    isLoading,
  };
};
