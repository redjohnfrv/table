import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { Controller, useForm } from 'react-hook-form'
import { CreateEditFormData, EditFormData } from './types.ts'
import { useGetChats } from '../../api/hooks/useGetChats.ts'
import { useCreateUser } from '../../api/hooks/useCreateUser.ts'
import { CreateEditUser } from '../../api/dto.ts'
import css from './create-edit-modal.module.css'
import { formatDateInputDefaultValue } from '../../utils/formatDate.ts'
import { useEditUser } from '../../api/hooks/useEditUser.ts'

type CreateEditModalProps = {
  onClose: () => void
  isOpen: boolean
  onSuccess: () => void
  isEditMode?: boolean
  defaultValues?: EditFormData
  uuid: string | null
}

export const CreateEditModal = ({
  onClose,
  isOpen,
  onSuccess,
  isEditMode,
  uuid,
  defaultValues,
}: CreateEditModalProps) => {
  const { handleSubmit, control } = useForm<CreateEditFormData>()
  const { chats, isLoading } = useGetChats()
  const { isLoading: isCreating, createUser } = useCreateUser()
  const { isLoading: isEditing, editUser } = useEditUser()

  const onSubmit = async (data: CreateEditFormData) => {
    if (isEditMode && uuid) {
      const editDataModified: CreateEditUser = {
        ...(data.adminTitle && { adminTitle: data.adminTitle }),
        ...(data.maxMessagesCount && {
          maxMessagesCount: Number(data.maxMessagesCount),
        }),
        ...(data.expiresAt && { expiresAt: data.expiresAt }),
      }

      await editUser(uuid, editDataModified)
    } else {
      const createDataModified: CreateEditUser = {
        ...data,
        tgUserId: Number(data?.tgUserId),
        maxMessagesCount: Number(data.maxMessagesCount),
      }

      await createUser(createDataModified)
    }

    onSuccess()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        {isEditMode ? 'Редактировать пользователя' : 'Добавить пользователя'}
      </DialogTitle>
      <DialogContent>
        <form className={css.form}>
          {!isEditMode && (
            <Controller
              name="tgUserId"
              control={control}
              render={({ field: { onChange } }) => (
                <div className={css.label}>
                  <InputLabel>ID пользователя:</InputLabel>
                  <TextField onChange={onChange} />
                </div>
              )}
            />
          )}

          {!isEditMode && (
            <Controller
              name="tgUsername"
              control={control}
              render={({ field: { onChange } }) => (
                <div className={css.label}>
                  <InputLabel>Имя пользователя:</InputLabel>
                  <TextField onChange={onChange} />
                </div>
              )}
            />
          )}

          <Controller
            name="adminTitle"
            control={control}
            render={({ field: { onChange } }) => (
              <div className={css.label}>
                <InputLabel>Заголовок:</InputLabel>
                <TextField
                  onChange={onChange}
                  defaultValue={isEditMode ? defaultValues?.adminTitle : ''}
                />
              </div>
            )}
          />

          {!isEditMode && (
            <Controller
              name="tgChatId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <div className={css.label}>
                  <InputLabel>Телеграм чат:</InputLabel>
                  <Select
                    onChange={onChange}
                    value={value}
                    disabled={isLoading}
                  >
                    {chats?.map((chat) => (
                      <MenuItem key={chat.id} value={chat.telegramChatId}>
                        {chat.title || chat.username}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              )}
            />
          )}

          <Controller
            name="maxMessagesCount"
            control={control}
            render={({ field: { onChange } }) => (
              <div className={css.label}>
                <InputLabel>Кол-во сообщений в сутки:</InputLabel>
                <TextField
                  type="number"
                  onChange={onChange}
                  defaultValue={isEditMode && defaultValues?.maxMessagesCount}
                />
              </div>
            )}
          />

          <Controller
            name="expiresAt"
            control={control}
            render={({ field: { onChange } }) => (
              <div className={css.label}>
                <InputLabel>Верифицирован до:</InputLabel>
                <TextField
                  type="date"
                  onChange={onChange}
                  defaultValue={
                    isEditMode &&
                    formatDateInputDefaultValue(defaultValues?.expiresAt || '')
                  }
                />
              </div>
            )}
          />
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          ОТМЕНА
        </Button>
        <Button
          disabled={isCreating || isEditing}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          {isEditMode ? 'СОХРАНИТЬ' : 'СОЗДАТЬ'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
