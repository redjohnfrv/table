import { Chat, CreateEditUser, User } from './dto.ts'
import { deleteData, fetchData, patchData, postData } from './utils.ts'
import { EditFormData } from '../components/create-edit-modal/types.ts'

const api = import.meta.env.VITE_API_URL

export async function getUsersFromApi(): Promise<User[]> {
  const url = `${api}/verified-users`

  try {
    const users = await fetchData(url)

    return users
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getChatsFromApi(): Promise<Chat[]> {
  const url = `${api}/chats`

  try {
    const chats = await fetchData(url)

    return chats
  } catch (error) {
    return []
  }
}

export async function createUserFromApi(
  data: CreateEditUser,
): Promise<User | null> {
  const url = `${api}/verified-users`

  try {
    const createdUser = await postData<User>(url, data, 'Пользователь создан!')

    return createdUser
  } catch (error) {
    return null
  }
}

export async function deleteUserFromApi(uuid: string) {
  const url = `${api}/verified-users/${uuid}`

  try {
    await deleteData(url)
  } catch (error) {
    return
  }
}

export async function restrictUserFromApi(uuid: string, hours: number) {
  const url = `${api}/verified-users/${uuid}/restrict`

  try {
    await postData<{ restrictedOnHours: number }>(
      url,
      {
        restrictedOnHours: hours,
      },
      'Пользователь заблокирован!',
    )
  } catch (error) {
    return
  }
}

export async function unRestrictUserFromApi(uuid: string) {
  const url = `${api}/verified-users/${uuid}/unrestrict`

  try {
    await postData(url, undefined, 'Пользователь разблокирован!')
  } catch (error) {
    return
  }
}

export async function editUserFromApi(uuid: string, data: EditFormData) {
  const url = `${api}/verified-users/${uuid}`

  try {
    await patchData<User>(url, data, 'Изменения сохранены!')
  } catch (error) {
    return
  }
}
