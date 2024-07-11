import { User } from '../../api/dto.ts'

export type CreateEditFormData = {
  tgUserId?: number
  tgUsername?: string
  tgChatId?: number
  maxMessagesCount?: number
  expiresAt?: string
  adminTitle?: string
}

export type EditFormData = Pick<
  User,
  'adminTitle' | 'maxMessagesCount' | 'expiresAt'
>
