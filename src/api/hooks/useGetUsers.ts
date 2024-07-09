import { useEffect, useState } from 'react'
import { getUsersFromApi } from '../api.ts'
import { TableUser } from '../../table/types.ts'

export const useGetUsers = () => {
  const [users, setUsers] = useState<TableUser[]>([])

  async function fetchUsers() {
    const usersData = await getUsersFromApi()

    if (usersData?.length) {
      setUsers(
        usersData.map((data) => ({
          id: data.id,
          name: data.tgUsername || 'unknown',
          count: data.maxMessagesCount,
          dateAt: data.restrictedAt,
          dateUntil: data.restrictedUntil,
        })),
      )
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users: users || [],
    refetch: fetchUsers,
  }
}
