export const formatDate = (date: string, withTime?: boolean) => {
  const newDate = new Date(date)

  const day = String(newDate.getDate()).padStart(2, '0')
  const month = String(newDate.getMonth() + 1).padStart(2, '0')
  const year = newDate.getFullYear()
  const hours = String(newDate.getHours()).padStart(2, '0')
  const minutes = String(newDate.getMinutes()).padStart(2, '0')

  return withTime
    ? `${day}.${month}.${year} ${hours}:${minutes}`
    : `${day}.${month}.${year}`
}

export const formatDateInputDefaultValue = (date: string) => {
  return date.split('T')[0]
}
