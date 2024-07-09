import { TableCell, TableHead, TableRow } from "@material-ui/core";

const labels = [
  "Имя пользователя",
  "Кол-во сообщений",
  "Ограничен с",
  "Ограничен до",
  "Действия",
];

export const TableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {labels.map((label) => (
          <TableCell key={label}>{label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
