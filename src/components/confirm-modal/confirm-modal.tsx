import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

type ConfirmModalProps = {
  onClose: () => void
  isOpen: boolean
  onSuccess: () => void
  confirmButtonMessage: string
  dialogTitle: string
  onConfirm: () => void
}

export const ConfirmModal = ({
  onClose,
  isOpen,
  onSuccess,
  dialogTitle,
  confirmButtonMessage,
  onConfirm,
}: ConfirmModalProps) => {
  const onSubmit = async () => {
    try {
      await onConfirm()
      onSuccess()

      onClose()
    } catch {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          ОТМЕНА
        </Button>
        <Button variant="contained" onClick={onSubmit} color="secondary">
          {confirmButtonMessage.toUpperCase()}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
