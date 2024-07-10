export type TableUser = {
  id?: string
  name?: string
  count?: number
  dateAt?: string
  dateUntil?: string
  isRestricted?: boolean
}

export enum RestrictTo {
  THREE_HOURS = 3,
  THREE_DAYS = 72,
}
