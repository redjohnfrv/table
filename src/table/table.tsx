import {
  Table as MUITable,
  TableBody,
  TableCell,
  TableRow,
  Checkbox,
  Button,
} from '@material-ui/core'
import { ChangeEvent, useMemo, useState } from 'react'
import { CreateEditModal } from '../components/create-edit-modal'
import { ActionToolbar } from '../components/action-toolbar'
import { TableHeader } from '../components/table-header'
import { useGetUsers } from '../api/hooks/useGetUsers.ts'
import { useDeleteUser } from '../api/hooks/useDeleteUser.ts'
import { ConfirmModal } from '../components/confirm-modal'
import { useRestrictUser } from '../api/hooks/useRestrictUser.ts'
import { RestrictTo } from './types.ts'
import { useUnRestrictUser } from '../api/hooks/useUnRestrictUser.ts'
import { formatDate } from '../utils'
import css from './table.module.css'

export const Table = () => {
  const { users, refetch, isLoading: isUsersLoading } = useGetUsers()
  const { restrictUser, isLoading: isRestricting } = useRestrictUser()
  const { unRestrictUser, isLoading: isUnRestricting } = useUnRestrictUser()
  const { deleteUser, isLoading: isDeleting } = useDeleteUser()

  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [targetId, setIsTargetId] = useState<string | null>(null)

  const [isCreateEditModalOpen, setIsCreateEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const handleRefetch = async () => {
    setSelectedIds([]), refetch()
  }

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    itemId: string,
  ) => {
    if (event.target.checked) {
      setSelectedIds([...selectedIds, itemId])
    } else {
      setSelectedIds(selectedIds.filter((id) => id !== itemId))
    }
  }

  const handleDeleteUser = async () => {
    if (targetId) {
      await deleteUser(targetId)
    }
  }

  const handleRestrictUser = async (uuid: string, hours: RestrictTo) => {
    await restrictUser(uuid, hours)

    await refetch()
  }

  const handleUnRestrictUser = async (uuid: string) => {
    await unRestrictUser(uuid)

    await refetch()
  }

  const targetUserDefaultValues = useMemo(() => {
    const targetUser = users?.find((user) => user.id === targetId)

    return {
      adminTitle: targetUser?.adminTitle,
      maxMessagesCount: targetUser?.count,
      expiresAt: targetUser?.verifiedAt,
    }
  }, [targetId, users])

  return (
    <div className={css.container}>
      <ActionToolbar
        openCreateEditModal={() => {
          setIsEditMode(false)
          setIsCreateEditModalOpen(true)
        }}
        selectedIds={selectedIds}
        onSuccess={handleRefetch}
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
                    onChange={(event) =>
                      handleCheckboxChange(event, user.id || '')
                    }
                  />
                  {user.name}
                </TableCell>
                <TableCell>{user.adminTitle}</TableCell>
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
                      onClick={() => handleUnRestrictUser(user.id || '')}
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
                        className={css.restrictButton}
                        onClick={() =>
                          handleRestrictUser(
                            user.id || '',
                            RestrictTo.THREE_HOURS,
                          )
                        }
                        variant="contained"
                        color="default"
                        size="small"
                      >
                        3 часа
                      </Button>
                      <Button
                        disabled={isRestricting}
                        className={css.restrictButton}
                        onClick={() =>
                          handleRestrictUser(
                            user.id || '',
                            RestrictTo.THREE_DAYS,
                          )
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
                    onClick={() => {
                      setIsTargetId(user.id!)
                      setIsEditMode(true)
                      setIsCreateEditModalOpen(true)
                    }}
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
          uuid={targetId}
          isEditMode={isEditMode}
          defaultValues={targetUserDefaultValues}
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
