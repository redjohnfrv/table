import { useState } from 'react'
import { CreateEditUser } from '../dto.ts'
import { createUserFromApi, restrictUserFromApi } from '../api.ts'

export const useRestrictUser = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function restrictUser(uuid: string, hours: number) {
    setIsLoading(true)

    await restrictUserFromApi(uuid, hours)

    setIsLoading(false)
  }

  return {
    restrictUser,
    isLoading,
  }
}