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
import css from './create-edit-modal.module.css'
import { CreateEditFormData } from './types.ts'
import { useGetChats } from '../../api/hooks/useGetChats.ts'
import { useCreateUser } from '../../api/hooks/useCreateUser.ts'
import { CreateEditUser, User } from '../../api/dto.ts'
import { toast } from 'react-toastify'

type CreateEditModalProps = {
  onClose: () => void
  isOpen: boolean
  onSuccess: () => void
}

export const CreateEditModal = ({
  onClose,
  isOpen,
  onSuccess,
}: CreateEditModalProps) => {
  const { handleSubmit, control } = useForm<CreateEditFormData>()
  const { chats, isLoading } = useGetChats()
  const { isLoading: isCreating, createUser } = useCreateUser()

  const onSubmit = async (data: CreateEditFormData) => {
    const dataModified: CreateEditUser = {
      ...data,
      tgUserId: Number(data?.tgUserId),
      maxMessagesCount: Number(data.maxMessagesCount),
    }

    await createUser(dataModified)

    onSuccess()
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Добавить пользователя</DialogTitle>
      <DialogContent>
        <form className={css.form}>
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
          <Controller
            name="adminTitle"
            control={control}
            render={({ field: { onChange } }) => (
              <div className={css.label}>
                <InputLabel>Заголовок:</InputLabel>
                <TextField onChange={onChange} />
              </div>
            )}
          />
          <Controller
            name="tgChatId"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div className={css.label}>
                <InputLabel>Телеграм чат:</InputLabel>
                <Select onChange={onChange} value={value} disabled={isLoading}>
                  {chats?.map((chat) => (
                    <MenuItem key={chat.id} value={chat.telegramChatId}>
                      {chat.username}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            )}
          />
          <Controller
            name="maxMessagesCount"
            control={control}
            render={({ field: { onChange } }) => (
              <div className={css.label}>
                <InputLabel>Кол-во сообщений в сутки:</InputLabel>
                <TextField type="number" onChange={onChange} />
              </div>
            )}
          />
          <Controller
            name="expiresAt"
            control={control}
            render={({ field: { onChange } }) => (
              <div className={css.label}>
                <InputLabel>Верифицирован до:</InputLabel>
                <TextField type="date" onChange={onChange} />
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
          disabled={isCreating}
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
          СОЗДАТЬ
        </Button>
      </DialogActions>
    </Dialog>
  )
}
