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
import { useDeleteUser } from '../api/hooks/useDeleteUser.ts'
import { ConfirmModal } from '../components/confirm-modal'

export const Table = () => {
  const { users, refetch, isLoading: isUsersLoading } = useGetUsers()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [targetId, setIsTargetId] = useState<string | null>(null)
  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const { deleteUser, isLoading: isDeleting } = useDeleteUser()

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

  const handleDeleteUser = async () => {
    if (targetId) {
      await deleteUser(targetId)
    }
  }

  return (
    <div>
      <ActionToolbar
        openCreateEditModal={() => setIsCreateEditModalOpen(true)}
        selectedIds={selectedIds}
      />

      {!users?.length && !isUsersLoading && (
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
                <TableCell>
                  <Button
                    className={css.actionButton}
                    onClick={() => handleClick(item)}
                    variant="contained"
                    color="default"
                    size="small"
                  >
                    3 часа
                  </Button>
                  <Button
                    className={css.actionButton}
                    onClick={() => handleClick(item)}
                    variant="contained"
                    color="default"
                    size="small"
                  >
                    3 дня
                  </Button>
                  <Button
                    className={css.actionButton}
                    onClick={() => handleClick(item)}
                    color="primary"
                    variant="contained"
                    size="small"
                  >
                    Редактировать
                  </Button>
                  <Button
                    className={css.actionButton}
                    disabled={isDeleting}
                    onClick={() => {
                      setIsTargetId(item.id!)
                      setIsDeleteModalOpen(true)
                    }}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      )}

      {isCreateEditModalOpen && (
        <CreateEditModal
          onSuccess={refetch}
          onClose={() => setIsCreateEditModalOpen(false)}
          isOpen={isCreateEditModalOpen}
        />
      )}

      {isDeleteModalOpen && (
        <ConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
          onSuccess={refetch}
          onConfirm={handleDeleteUser}
          confirmButtonMessage="УДАЛИТЬ"
          dialogTitle="Удалить пользователя?"
        />
      )}
    </div>
  )
}
