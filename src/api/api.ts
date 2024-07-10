import { Chat, CreateEditUser, User } from './dto.ts'
import { deleteData, fetchData, postData } from './utils.ts'

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
    const createdUser = await postData<User>(url, data)

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
