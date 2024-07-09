export type User = {
  tgUserId?: number;
  tgUsername?: string;
  tgChatId?: number;
  adminTitle?: string;
  maxMessagesCount?: number;
  restrictedAt?: string;
  restrictedUntil?: string;
  id?: string;
};

export type TableUser = {
  id: string;
  name: string;
  count: number;
  dateAt: string;
  dateUntil: string;
};

export type Chat = {
  id: string;
  telegramChatId: number;
  username: string;
};

export type CreateEditUser = {
  tgUserId?: number;
  tgUsername?: string;
  tgChatId?: number;
  adminTitle?: string;
  maxMessagesCount?: number;
  restrictedAt?: string;
  restrictedUntil?: string;
};
