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
import { useRestrictUser } from '../api/hooks/useRestrictUser.ts'
import { RestrictTo } from './types.ts'
import { useUnRestrictUser } from '../api/hooks/useUnRestrictUser.ts'
import { formatDate } from '../utils'

export const Table = () => {
  const { users, refetch, isLoading: isUsersLoading } = useGetUsers()
  const { restrictUser, isLoading: isRestricting } = useRestrictUser()
  const { unRestrictUser, isLoading: isUnRestricting } = useUnRestrictUser()
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

  const handleRestrictUser = async (uuid, hours: RestrictTo) => {
    await restrictUser(uuid, hours)

    await refetch()
  }

  const handleUnRestrictUser = async (uuid) => {
    await unRestrictUser(uuid)

    await refetch()
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
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Checkbox
                    onChange={(event) => handleCheckboxChange(event, user.id)}
                  />
                  {user.name}
                </TableCell>
                <TableCell>{user.count}</TableCell>
                <TableCell>
                  {!!user.verifiedAt && formatDate(user.verifiedAt)}
                </TableCell>
                <TableCell>
                  {!!user.restrictedUntil &&
                    formatDate(user.restrictedUntil, true)}
                </TableCell>
                <TableCell>
                  {user.isRestricted ? (
                    <Button
                      disabled={isUnRestricting}
                      className={css.actionButton}
                      onClick={() => handleUnRestrictUser(user.id)}
                      variant="contained"
                      color="default"
                      size="small"
                    >
                      Разблокировать
                    </Button>
                  ) : (
                    <>
                      <Button
                        disabled={isRestricting}
                        className={css.actionButton}
                        onClick={() =>
                          handleRestrictUser(user.id, RestrictTo.THREE_HOURS)
                        }
                        variant="contained"
                        color="default"
                        size="small"
                      >
                        3 часа
                      </Button>
                      <Button
                        disabled={isRestricting}
                        className={css.actionButton}
                        onClick={() =>
                          handleRestrictUser(user.id, RestrictTo.THREE_DAYS)
                        }
                        variant="contained"
                        color="default"
                        size="small"
                      >
                        3 дня
                      </Button>{' '}
                    </>
                  )}
                  <Button
                    className={css.actionButton}
                    onClick={() => handleClick(user)}
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
                      setIsTargetId(user.id!)
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
