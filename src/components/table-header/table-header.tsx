import { TableCell, TableHead, TableRow } from '@material-ui/core'

const labels = [
  'Имя пользователя',
  'Заголовок',
  'Макс. сообщений',
  'Верифицирован до',
  'Заблокирован до',
  '',
]

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {labels.map((label, index) => (
          <TableCell key={label + index}>{label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
