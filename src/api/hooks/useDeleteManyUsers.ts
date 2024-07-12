import { useState } from 'react'
import { deleteManyUsersFromApi } from '../api.ts'

export const useDeleteManyUsers = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function deleteManyUsers(uuids: string[]) {
    setIsLoading(true)

    await deleteManyUsersFromApi(uuids)

    setIsLoading(false)
  }

  return {
    deleteManyUsers,
    isLoading,
  }
}
