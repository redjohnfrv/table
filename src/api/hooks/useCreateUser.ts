import { useState } from 'react'
import { CreateEditUser } from '../dto.ts'
import { createUserFromApi } from '../api.ts'

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function createUser(data: CreateEditUser) {
    setIsLoading(true)
    await createUserFromApi(data)

    setIsLoading(false)
  }

  return {
    createUser,
    isLoading,
  }
}
