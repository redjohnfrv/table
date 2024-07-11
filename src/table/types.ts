export type TableUser = {
  id?: string
  name?: string
  count?: number
  verifiedAt?: string
  restrictedUntil?: string
  isRestricted?: boolean
}

export enum RestrictTo {
  THREE_HOURS = 3,
  THREE_DAYS = 72,
}
