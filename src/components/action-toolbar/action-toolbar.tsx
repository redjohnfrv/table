import { Button, Toolbar } from '@material-ui/core'
import css from './action-toolbar.module.css'

type ActionToolbarProps = {
  openCreateEditModal: () => void
  selectedIds: string[]
}

export const ActionToolbar = ({
  openCreateEditModal,
  selectedIds,
}: ActionToolbarProps) => {
  return (
    <Toolbar className={css.toolbar}>
      <Button variant="contained" color="primary" onClick={openCreateEditModal}>
        Создать
      </Button>
      <Button
        disabled={!selectedIds?.length}
        variant="contained"
        color="secondary"
        onClick={() => console.log(2)}
      >
        Удалить
      </Button>
    </Toolbar>
  )
}
