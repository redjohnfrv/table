import { useEffect, useState } from 'react'
import { getUsersFromApi } from '../api.ts'
import { TableUser } from '../../table/types.ts'

export const useGetUsers = () => {
  const [users, setUsers] = useState<TableUser[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function fetchUsers() {
    setIsLoading(true)

    const usersData = await getUsersFromApi()

    if (usersData?.length) {
      setUsers(
        usersData.map((data) => ({
          id: data.id,
          name: data.tgUsername || 'unknown',
          count: data.maxMessagesCount,
          dateAt: data.expiresAt,
          isRestricted: data.isRestricted,
        })),
      )
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return {
    users: users || [],
    refetch: fetchUsers,
    isLoading,
  }
}
