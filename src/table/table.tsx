import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
} from '@material-ui/core'
import { useState } from 'react'
import { CreateEditModal } from '../components/create-edit-modal'
import { ActionToolbar } from '../components/action-toolbar'
import { TableHeader } from '../components/table-header'
import { useGetUsers } from '../api/hooks/useGetUsers.ts'
import css from './table.module.css'

export const Table = () => {
  const { users, refetch } = useGetUsers()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const handleCheckboxChange = (event, itemId) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, itemId])
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== itemId))
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (item: any) => {
    console.log(item)
  }

  return (
    <div>
      <ActionToolbar з open={() => setIsOpen(true)} selectedIds={selectedIds} />

      {users?.length && (
        <div className={css.noUsers}>
          <h4>Пользователи отсутствуют</h4>
          <h1>:(</h1>
        </div>
      )}

      {!!users?.length && (
        <MUITable>
          <TableHeader />
          <TableBody>
            {users.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Checkbox
                    onChange={(event) => handleCheckboxChange(event, item.id)}
                  />
                  {item.name}
                </TableCell>
                <TableCell>{item.count}</TableCell>
                <TableCell>{item.dateAt}</TableCell>
                <TableCell>{item.dateUntil}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleClick(item)}
                    variant="contained"
                    color="primary"
                  >
                    Action 1
                  </Button>
                  <Button
                    onClick={() => handleClick(item)}
                    variant="contained"
                    color="secondary"
                  >
                    Action 2
                  </Button>
                  <Button
                    onClick={() => handleClick(item)}
                    variant="contained"
                    color="default"
                  >
                    Action 3
                  </Button>
                  <Button
                    onClick={() => handleClick(item)}
                    variant="contained"
                    color="default"
                  >
                    Action 4
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      )}

      {isOpen && (
        <CreateEditModal
          onSuccess={refetch}
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        />
      )}
    </div>
  )
}
