import { useState } from 'react'
import { CreateEditUser } from '../dto.ts'
import { createUserFromApi, editUserFromApi } from '../api.ts'
import { EditFormData } from '../../components/create-edit-modal/types.ts'

export const useEditUser = () => {
  const [isLoading, setIsLoading] = useState(false)

  async function editUser(uuid: string, data: EditFormData) {
    setIsLoading(true)

    const user = await editUserFromApi(uuid, data)

    setIsLoading(false)

    return user
  }

  return {
    editUser,
    isLoading,
  }
}
