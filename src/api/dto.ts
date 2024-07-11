export type User = {
  tgUserId?: number
  tgUsername?: string
  tgChatId?: number
  adminTitle?: string
  maxMessagesCount?: number
  id?: string
  isRestricted?: boolean
  expiresAt?: string
  restrictedUntil?: string
}

export type Chat = {
  id: string
  telegramChatId: number
  username: string
}

export type CreateEditUser = {
  tgUserId?: number
  tgUsername?: string
  tgChatId?: number
  adminTitle?: string
  maxMessagesCount?: number
  expiresAt?: string
}
