import { TableCell, TableHead, TableRow } from '@material-ui/core'

const labels = [
  'Имя пользователя',
  'Макс. сообщений',
  'Верифицирован до',
  'Заблокирован до',
  '',
]

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {labels.map((label) => (
          <TableCell key={label}>{label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
