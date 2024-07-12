import { Button, Toolbar } from '@material-ui/core'
import css from './action-toolbar.module.css'
import { useDeleteManyUsers } from '../../api/hooks/useDeleteManyUsers.ts'
import { ConfirmModal } from '../confirm-modal'
import { useState } from 'react'

type ActionToolbarProps = {
  openCreateEditModal: () => void
  selectedIds: string[]
  onSuccess: () => void
}

export const ActionToolbar = ({
  openCreateEditModal,
  selectedIds,
  onSuccess,
}: ActionToolbarProps) => {
  const { deleteManyUsers, isLoading } = useDeleteManyUsers()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeleteManyUsers = async () => {
    await deleteManyUsers(selectedIds)
  }

  return (
    <Toolbar className={css.toolbar}>
      <Button variant="contained" color="primary" onClick={openCreateEditModal}>
        Создать
      </Button>
      <Button
        disabled={!selectedIds?.length || isLoading}
        variant="contained"
        color="secondary"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        Удалить
      </Button>

      {isDeleteModalOpen && (
        <ConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          isOpen={isDeleteModalOpen}
          onSuccess={onSuccess}
          onConfirm={handleDeleteManyUsers}
          confirmButtonMessage="УДАЛИТЬ"
          dialogTitle="Удалить пользователей?"
        />
      )}
    </Toolbar>
  )
}
