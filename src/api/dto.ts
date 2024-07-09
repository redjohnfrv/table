export type User = {
  tgUserId?: number
  tgUsername?: string
  tgChatId?: number
  adminTitle?: string
  maxMessagesCount?: number
  restrictedAt?: string
  restrictedUntil?: string
  id?: string
  isRestricted?: boolean
  expiresAt?: string
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
  isRestricted?: boolean
  adminTitle?: string
  maxMessagesCount?: number
  expiresAt?: string
}
