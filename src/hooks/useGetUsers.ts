import { getUsersFromApi } from "../api";
import { useEffect, useState } from "react";
import { TableUser } from "../api/dto.ts";

export const useGetUsers = () => {
  const [users, setUsers] = useState<TableUser[]>([]);

  async function fetchUsersAndUser() {
    const usersData = await getUsersFromApi();

    if (usersData?.length) {
      setUsers(
        usersData.map((data) => ({
          id: data.id,
          name: data.tgUsername || "unknown",
          count: data.maxMessagesCount,
          dateAt: data.restrictedAt,
          dateUntil: data.restrictedUntil,
        })),
      );
    }
  }

  useEffect(() => {
    fetchUsersAndUser();
  }, []);

  return users || [];
};
