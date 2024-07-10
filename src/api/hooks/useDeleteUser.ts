import { useState } from 'react'
import { deleteUserFromApi } from '../api.ts'

export const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function deleteUser(uuid: string) {
    setIsLoading(true)
    await deleteUserFromApi(uuid)

    setIsLoading(false)
  }

  return {
    deleteUser,
    isLoading,
  }
}
