import { useState } from 'react'
import { CreateEditUser } from '../dto.ts'
import {
  createUserFromApi,
  restrictUserFromApi,
  unRestrictUserFromApi,
} from '../api.ts'

export const useUnRestrictUser = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function unRestrictUser(uuid: string) {
    setIsLoading(true)

    await unRestrictUserFromApi(uuid)

    setIsLoading(false)
  }

  return {
    unRestrictUser,
    isLoading,
  }
}
